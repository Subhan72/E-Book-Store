import express from 'express';
import { fetchBooks, createBook, getAllBooks, getBooksByCategory, deleteBook } from '../controllers/bookController.js';

const router = express.Router();

router.get('/fetch-books', fetchBooks);

router.post('/books', createBook);

// GET: Get all books
router.get('/books', getAllBooks);

// GET: Get a book by category
router.get('/books/:genre', getBooksByCategory);

// DELETE: Delete a book by ISBN
router.delete('/books/:ISBN', deleteBook);

export default router;
