import mongoose from 'mongoose';
import Testimonial from '../Infrastructures/models/testimoneyModel.js';
class TestimonialRepository {
    async create(testimonialData) {
        try {
            const existTestimony = await Testimonial.findOne({ title: testimonialData.title });

            if (existTestimony) {
                throw new Error("Testimonial with this title already exists.");
            }

            const testimony = new Testimonial(testimonialData);
            return await testimony.save();
        } catch (error) {

            if (error.message === "Testimonial with this title already exists.") {
                throw error;
            }

            throw new Error("Failed to create testimonial.");
        }
    }


    async findAll(filters = {}, page = 1, limit = 10) {
        try {
            if (page < 1 || limit < 1) {
                throw new Error("Page and limit must be greater than 0.");
            }

            const skip = (page - 1) * limit;
            const testimonials = await Testimonial.find(filters)
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 });

            return testimonials;
        } catch (error) {

            if (error.message === "Page and limit must be greater than 0.") {
                throw error;
            }

            throw new Error(`Failed to fetch testimonials: ${error.message}`);
        }
    }

        async count(filters = {}) {
            try {
                return await Testimonial.countDocuments(filters);
            } catch (error) {

                throw new Error("Failed to count testimonials.");
            }
        }

    async update(id, updatedData) {
        try {
            const updatedTestimonial = await Testimonial.findByIdAndUpdate(id, updatedData, { new: true });

            if (!updatedTestimonial) {
                throw new Error("Testimonial not found.");
            }

            return updatedTestimonial;
        } catch (error) {
            if (error.message === "Testimonial not found.") {
                throw error; // Preserve specific "not found" error
            }
            throw new Error("Failed to update testimonial.");
        }
    }


    async findById(id) {
        try {
            // 1. Validate if the ID is a valid MongoDB ObjectId
            if (!mongoose.isValidObjectId(id)) {
                throw new Error("Invalid ID format.");
            }

            // 2. Query the database
            const testimonial = await Testimonial.findById(id);

            // 3. Return the result (or null if not found)
            return testimonial;
        } catch (error) {
            // If it's our own validation error, rethrow it
            if (error.message === "Invalid ID format.") {
                throw error;
            }
            // Otherwise, throw a general database error
            throw new Error(`Failed to retrieve testimonial: ${error.message}`);
        }
    }

// ... rest of the class ...

    async delete(id) {
        try {
            const deletedTestimonial = await Testimonial.findByIdAndDelete(id);

            if (!deletedTestimonial) {
                throw new Error("Testimonial not found.");
            }

            return deletedTestimonial;
        } catch (error) {
            if (error.message === "Testimonial not found.") {
                throw error; // Preserve specific "not found" error
            }
            throw new Error("Failed to delete testimonial.");
        }
    }

}

export default TestimonialRepository;
