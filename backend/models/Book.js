const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  isbn: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  author: { type: String },
  description: { type: String },
  publishedDate: { type: Date },
  stock: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  imageUrl: { type: String },
  category: { type: String },
  tags: [String],
  customMetadata: { type: Object },
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
