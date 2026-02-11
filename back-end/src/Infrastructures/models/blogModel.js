import mongoose from 'mongoose';
const CommentSchema = new mongoose.Schema({
    email: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    image: { 
        data: Buffer, 
        contentType: String 
    }, 
    tags: { type: [String], default: [] },
    comments: [CommentSchema], 
    likeCount: { type: Number, default: 0 },  
    dislikeCount: { type: Number, default: 0 },
    status: { type: String, required: true },
}, { timestamps: true }); 

const BlogModel = mongoose.model('Blog', BlogSchema);
export default BlogModel;
