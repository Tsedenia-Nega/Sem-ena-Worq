import mongoose from 'mongoose';
 import sharp from "sharp";
 import path from "path";
import BlogEntity from '../../Domain/blogEntity.js';
class BlogController {
  constructor(blogRepository) {
    this.blogRepository = blogRepository;
  }

  async createBlog(req, res) {
    console.log("RECEIVED BODY:", req.body); // Check your terminal for this!
    console.log("RECEIVED FILE:", req.file);

    try {
      const { title, content, author, tags, status, category } = req.body;
      const image = req.file ? req.file.filename : null;

      if (!image) {
        return res
          .status(400)
          .json({ error: "Image file is missing from the request." });
      }

      const blogEntity = new BlogEntity({
        title: title || "Untitled",
        content: content || "",
        author: author || "Admin",
        // Safety: Handle tags even if it's missing or not a string
        tags:
          typeof tags === "string" && tags.length > 0 ? tags.split(",") : [],
        status: status || "published",
        category: category || "General",
        image,
      });

      const blog = await this.blogRepository.create(blogEntity);
      res.status(201).json(blog);
    } catch (error) {
      console.error("BACKEND CRASH:", error);
      res.status(400).json({ error: error.message });
    }
  }

  async listBlogsAdmin(req, res) {
    try {
      const blogs = await this.blogRepository.findAll();

      res.status(200).json(blogs);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async updateBlog(req, res) {
    try {
      const { blogId: id } = req.params;

      // 1. Create a clean update object from the body
      const updateData = { ...req.body };

      // 2. CRITICAL: If no new file was uploaded,
      // REMOVE the image key entirely so it doesn't overwrite with "{}"
      if (req.file) {
        updateData.image = req.file.filename;
      } else {
        delete updateData.image; // This prevents the Mongoose Cast Error
      }

      // 3. Handle tags if they are being sent as a string
      if (updateData.tags && typeof updateData.tags === "string") {
        updateData.tags = updateData.tags.split(",").map((t) => t.trim());
      }

      // 4. Validate using your entity
      const blogEntity = new BlogEntity(updateData);
      blogEntity.validateOnUpdate();

      
      const updatedBlog = await this.blogRepository.update(id, updateData);

      if (!updatedBlog)
        return res.status(404).json({ error: "Blog not found." });

      res.status(200).json(updatedBlog);
    } catch (error) {
      console.error("UPDATE ERROR:", error);
      res.status(400).json({ error: error.message });
    }
  }
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
  
