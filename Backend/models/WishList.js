import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    books: [
        {
            ISBN: { type: String, required: true, unique: true },
            title: { type: String, required: true },
            author: { type: String, required: true }, // Changed from authors to author for single value
            price: { type: Number},
            stock: { type: Number}, 
            description: { type: String },
            thumbnail: { type: String },
            genre: { type: String, required: true }, 
            createdAt: { type: Date, default: Date.now }, 
        }
    ],
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Wishlist', wishlistSchema);
