import BlogModel from "../Infrastructures/models/blogModel.js";
import mongoose from "mongoose";

class BlogRepository {
  async create(blogData) {
    // Validation: Ensure blogData contains unique identifiers if needed
    const blog = new BlogModel(blogData);
    return await blog.save();
  }

  async update(id, updateData) {
    return await BlogModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id) {
    const deletedBlog = await BlogModel.findByIdAndDelete(id);
    if (!deletedBlog) throw new Error("Blog not found");
    return deletedBlog;
  }

  async findById(id) {
    return await BlogModel.findById(id);
  }

  async findAll(filters = {}, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return await BlogModel.find(filters)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
  }

  // --- FIXED FEEDBACK LOGIC ---
  async addFeedback(blogId, ipAddress, feedbackType) {
    // 1. Try to find a blog where this IP does NOT exist in the feedback array
    // This is the "Atomic Check"
    const fieldToIncrement =
      feedbackType === "liked" ? "likeCount" : "dislikeCount";

    const updatedBlog = await BlogModel.findOneAndUpdate(
      {
        _id: blogId,
        feedback: { $ne: ipAddress }, // "If IP is NOT EQUAL to any value in the array"
      },
      {
        $push: { feedback: ipAddress },
        $inc: { [fieldToIncrement]: 1 },
      },
      { new: true }, // Return the updated document
    );

    // 2. If updatedBlog is null, it means either:
    //    a) The blog doesn't exist.
    //    b) The IP was ALREADY in the array (the $ne condition failed).
    if (!updatedBlog) {
      const blogExists = await BlogModel.findById(blogId);
      if (!blogExists) throw new Error("Blog not found.");
      throw new Error(`You have already ${feedbackType} this post.`);
    }

    return updatedBlog;
  }

  async addLike(blogId, ipAddress) {
    return await this.addFeedback(blogId, ipAddress, "liked");
  }

  async addDislike(blogId, ipAddress) {
    return await this.addFeedback(blogId, ipAddress, "disliked");
  }

  async getLikes(blogId) {
    const blog = await BlogModel.findById(blogId).select("likeCount");
    return blog ? blog.likeCount : 0;
  }

  async getDislikes(blogId) {
    const blog = await BlogModel.findById(blogId).select("dislikeCount");
    return blog ? blog.dislikeCount : 0;
  }

  // --- FIXED COMMENTS LOGIC ---
  async getComments(blogId) {
    const blog = await BlogModel.findById(blogId).select("comments");
    if (!blog) throw new Error("Blog not found.");
    return {
      comments: blog.comments,
      total: blog.comments.length,
    };
  }
}

export default BlogRepository;
