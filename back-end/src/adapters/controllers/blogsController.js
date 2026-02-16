import mongoose from 'mongoose';
 import sharp from "sharp";
import BlogEntity from '../../Domain/blogEntity.js';
class BlogController {
  constructor(blogRepository) {
    this.blogRepository = blogRepository;
  }

 

// Inside your BlogController class
async createBlog(req, res) {
  try {
    const { title, content, author, tags, status } = req.body;
    
    let image = null;
    if (req.file) {
      // OPTIMIZE: Resize and convert to WebP for speed
      image = await sharp(req.file.buffer)
        .resize(1200) // Slightly larger for blog headers
        .webp({ quality: 80 })
        .toBuffer();
    }

    const blogEntity = new BlogEntity({
      title, content, author, tags, status, image
    });

    blogEntity.validate();
    const blog = await this.blogRepository.create(blogEntity);
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Add this helper to the class to use in your list/get methods
convertImageToBase64(imageBuffer) {
  if (imageBuffer && imageBuffer.data) {
    const buffer = Buffer.isBuffer(imageBuffer) ? imageBuffer : Buffer.from(imageBuffer.data);
    return `data:image/webp;base64,${buffer.toString("base64")}`;
  }
  return null;
}

async listBlogs(req, res) {
  try {
    const blogs = await this.blogRepository.findAll({ status: "published" });
    
    // Format blogs to include the Base64 string
    const formattedBlogs = blogs.map(blog => ({
      ...blog._doc,
      image: this.convertImageToBase64(blog.image)
    }));
    
    res.status(200).json(formattedBlogs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

  async updateBlog(req, res) {
    try {
      const { blogId: id } = req.params;
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ error: "Invalid blog ID." });
      }

      const { title, content, author, tags, status } = req.body;
      const image = req.file ? req.file.buffer : undefined;

      const existingBlog = await this.blogRepository.findById(id);
      if (!existingBlog) {
        return res.status(404).json({ error: "Blog not found." });
      }

      const updatedData = { title, content, author, tags, status };
      if (image) updatedData.image = image;

      const updatedBlog = await this.blogRepository.update(id, updatedData);
      res.status(200).json(updatedBlog);
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
  async listBlogsAdmin(req, res) {
    try {
      const blogs = await this.blogRepository.findAll();
      res.status(200).json(blogs);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

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
  
