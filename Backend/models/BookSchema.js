import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    ISBN: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    author: { type: String, required: true }, // Changed from authors to author for single value
    price: { type: Number, required: true },
    stock: { type: Number, required: true }, // Added stock
    description: { type: String },
    genre: { type: String, required: true }, // Added genre
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true }, // Added seller as reference
    createdAt: { type: Date, default: Date.now }, // Added createdAt with default value
});

export default mongoose.model('Book', bookSchema);
