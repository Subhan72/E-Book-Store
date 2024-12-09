import mongoose from 'mongoose';

// Schema for individual items in the cart
const cartItemSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book', // Reference to the Book model
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    authors: {
        type: [String], // Array of author names
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
    },
    isbn: {
        type: String, // ISBN for the book
        required: true,
    },
    total: {
        type: Number,
        required: true,
        min: 0,
    },
});

// Main Cart Schema
const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    items: [cartItemSchema], // Array of books in the cart
    subTotal: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Middleware to calculate the subtotal and update the `updatedAt` field
cartSchema.pre('save', function (next) {
    this.subTotal = this.items.reduce((acc, item) => acc + item.total, 0);
    this.updatedAt = Date.now();
    next();
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
