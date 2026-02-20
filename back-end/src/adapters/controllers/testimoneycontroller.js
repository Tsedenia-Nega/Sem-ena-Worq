import mongoose from "mongoose";
import TestimonialEntity from "../../Domain/testimoneyEntity.js";

class TestimonialController {
  constructor(repository) {
    this.testimonialRepository = repository;
  }

  // Create a new Testimonial
  async createTestimonial(req, res) {
   
    try {
      const { name, email, content, company, visibility } = req.body;

      // Use filename string just like your Blog controller
      const image = req.file ? req.file.filename : null;

      if (!name || !email || !content || !company) {
        return res.status(400).json({
          error: "Missing required fields: name, email, content, and company",
        });
      }

      const testimonialData = {
        name,
        email,
        content,
        company,
        visibility: visibility || "public",
        image,
      };

      const testimonialEntity = new TestimonialEntity(testimonialData);
      testimonialEntity.validate();

      const testimonial =
        await this.testimonialRepository.create(testimonialEntity);

      res.status(201).json(testimonial);
    } catch (error) {
      console.error("CREATE ERROR:", error);
      res.status(400).json({ error: error.message });
    }
  }

  // List Testimonials (Unified logic)
  async listTestimonials(req, res) {
    try {
      const filters = {};
      if (req.query.name) filters.name = req.query.name;

      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 10;

      const testimonies = await this.testimonialRepository.findAll(
        filters,
        page,
        limit,
      );
      const total = await this.testimonialRepository.count(filters);

      res.status(200).json({
        testimonials: testimonies,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Update Testimonial (Clean logic like Blog)
  async updateTestimonial(req, res) {
    try {
      const { id } = req.params;

      // 1. Create a clean update object
      const updateData = { ...req.body };

      // 2. CRITICAL: Handle image filename correctly
      if (req.file) {
        updateData.image = req.file.filename;
      } else {
        // Prevent overwriting with empty object if no new file is sent
        delete updateData.image;
      }

      // 3. Validate using entity
      const testimonialEntity = new TestimonialEntity(updateData);
      testimonialEntity.validateOnUpdate();

      const updatedTestimonial = await this.testimonialRepository.update(
        id,
        updateData,
      );

      if (!updatedTestimonial) {
        return res.status(404).json({ error: "Testimonial not found" });
      }

      res.status(200).json(updatedTestimonial);
    } catch (error) {
      console.error("UPDATE ERROR:", error);
      res.status(400).json({ error: error.message });
    }
  }

  async getTestimonialById(req, res) {
    try {
      const { id } = req.params;
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ error: "Invalid ID." });
      }

      const testimonial = await this.testimonialRepository.findById(id);
      if (!testimonial) {
        return res.status(404).json({ error: "Testimonial not found" });
      }

      res.status(200).json(testimonial);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteTestimonial(req, res) {
    try {
      const { id } = req.params;
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ error: "Invalid ID." });
      }

      const deleted = await this.testimonialRepository.delete(id);
      if (!deleted) {
        return res.status(404).json({ error: "Testimonial not found" });
      }

      res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default TestimonialController;
