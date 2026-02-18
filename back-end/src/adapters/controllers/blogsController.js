import mongoose from 'mongoose';
 import sharp from "sharp";
 import path from "path";
import BlogEntity from '../../Domain/blogEntity.js';
class BlogController {
  constructor(blogRepository) {
    this.blogRepository = blogRepository;
  }

  async createBlog(req, res) {
    try {
      const { title, content, author, tags, status, category } = req.body;

      // Use the filename provided by Multer (DiskStorage)
      const image = req.file ? req.file.filename : null;

      if (!image) {
        return res.status(400).json({ error: "Image is required." });
      }

      const blogEntity = new BlogEntity({
        title,
        content,
        author,
        tags,
        status,
        category,
        image,
      });

      blogEntity.validate();

      const blog = await this.blogRepository.create(blogEntity);
      res.status(201).json(blog);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async listBlogsAdmin(req, res) {
    try {
      console.log("ADMIN BLOG FETCH HIT"); // 👈 add

      const blogs = await this.blogRepository.findAll();

      res.status(200).json(blogs);
    } catch (error) {
      console.error("ADMIN FETCH ERROR:", error); // 👈 add
      res.status(400).json({ error: error.message });
    }
  }
  async updateBlog(req, res) {
    try {
      const { blogId: id } = req.params;

      // Only allow certain fields
      const allowedFields = [
        "title",
        "content",
        "category",
        "status",
        "author",
        "tags",
      ];
      const updateData = {};

      allowedFields.forEach((field) => {
        if (req.body[field] !== undefined && req.body[field] !== "") {
          updateData[field] = req.body[field];
        }
      });

      if (req.file) updateData.image = req.file.filename;

      // Use { new: true } to return updated document
      const updatedBlog = await this.blogRepository.update(id, updateData, {
        new: true,
        runValidators: true,
      });

      if (!updatedBlog)
        return res.status(404).json({ error: "Blog not found." });

      res.status(200).json(updatedBlog);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // listBlogs remains the same, just returning the data as is
  async listBlogs(req, res) {
    try {
      const blogs = await this.blogRepository.findAll({ status: "published" });
      res.status(200).json(blogs);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteBlog(req, res) {
    try {
      const { blogId: id } = req.params;
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ error: "Invalid blog ID." });
      }

      const deletedBlog = await this.blogRepository.delete(id);
      if (!deletedBlog) {
        return res.status(404).json({ error: "Blog not found." });
      }

      res.status(200).json({ message: "Blog deleted successfully." });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getBlog(req, res) {
    try {
      const { blogId: id } = req.params;
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ error: "Invalid blog ID." });
      }

      const blog = await this.blogRepository.findById(id);
      if (!blog) {
        return res.status(404).json({ error: "Blog not found." });
      }

      res.status(200).json(blog);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async addComment(req, res) {
    try {
      const { blogId } = req.params;
      const { email, content } = req.body;

      if (!mongoose.isValidObjectId(blogId)) {
        return res.status(400).json({ error: "Invalid blog ID." });
      }

      const updatedBlog = await this.blogRepository.addComment(blogId, {
        email,
        content,
      });

      if (!updatedBlog) {
        return res
          .status(404)
          .json({ error: "Blog not found or comment could not be added." });
      }

      res.status(200).json(updatedBlog);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // ... (create, update, get, delete are already done)

  // GET /get - Public list (only published blogs)

  // GET /get/admin - Admin list (all blogs)

  // DELETE /deleteComment/:blogId/:commentId
  async removeComment(req, res) {
    try {
      const { blogId, commentId } = req.params;

      if (
        !mongoose.isValidObjectId(blogId) ||
        !mongoose.isValidObjectId(commentId)
      ) {
        return res.status(400).json({ error: "Invalid Blog or Comment ID." });
      }

      const updatedBlog = await this.blogRepository.removeComment(
        blogId,
        commentId,
      );
      if (!updatedBlog)
        return res.status(404).json({ error: "Blog not found." });

      res
        .status(200)
        .json({ message: "Comment removed successfully", data: updatedBlog });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // GET /getComments/:blogId
  async getComments(req, res) {
    try {
      const { blogId } = req.params;
      if (!mongoose.isValidObjectId(blogId))
        return res.status(400).json({ error: "Invalid ID." });

      const blog = await this.blogRepository.findById(blogId);
      if (!blog) return res.status(404).json({ error: "Blog not found." });

      res.status(200).json(blog.comments || []);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // POST /like/:blogId
  // POST /like/:blogId
  async addLike(req, res) {
    try {
      const { blogId } = req.params;
      // We get the IP address from the request to prevent duplicate likes
      const ipAddress =
        req.ip || req.headers["x-forwarded-for"] || req.socket.remoteAddress;

      const updatedBlog = await this.blogRepository.addLike(blogId, ipAddress);
      res.status(200).json({
        message: "Liked successfully",
        likeCount: updatedBlog.likeCount,
      });
    } catch (error) {
      // This will catch your repository's "You have already liked" error
      res.status(400).json({ error: error.message });
    }
  }

  // POST /dislike/:blogId
  async addDislike(req, res) {
    try {
      const { blogId } = req.params;
      const ipAddress =
        req.ip || req.headers["x-forwarded-for"] || req.socket.remoteAddress;

      const updatedBlog = await this.blogRepository.addDislike(
        blogId,
        ipAddress,
      );
      res.status(200).json({
        message: "Disliked successfully",
        dislikeCount: updatedBlog.dislikeCount,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getLikes(req, res) {
    try {
      const { blogId } = req.params;

      if (!mongoose.isValidObjectId(blogId)) {
        return res.status(400).json({ error: "Invalid blog ID." });
      }

      const likeCount = await this.blogRepository.getLikes(blogId);
      res.status(200).json({ blogId, likeCount });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async getDislikes(req, res) {
    try {
      const { blogId } = req.params;

      if (!mongoose.isValidObjectId(blogId)) {
        return res.status(400).json({ error: "Invalid blog ID." });
      }

      const dislikeCount = await this.blogRepository.getDislikes(blogId);
      res.status(200).json({ blogId, dislikeCount });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}
    
export default BlogController;
  
