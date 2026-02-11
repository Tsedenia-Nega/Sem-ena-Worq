import mongoose from 'mongoose';
const TestimonialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    company:{type: String, required: true},
    image: { data: Buffer, contentType: String},
    content: { type: String, required: true},
    visibility: { type: String, enum: ['public', 'private'], required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
},{
    timestamps: true,  
});

const Testimonial = mongoose.model('Testimonial', TestimonialSchema);
export default Testimonial;