import mongoose from 'mongoose';

const PortfolioSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: [String], default: [] },
    image: { type: String, required: true }, 
    visibility: { type: String, enum: ['public', 'private'], required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
},{
    timestamps: true,  
});

const PortfolioModel = mongoose.model('Portfolio', PortfolioSchema);
export default PortfolioModel;