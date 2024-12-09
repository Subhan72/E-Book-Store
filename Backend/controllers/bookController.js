import axios from 'axios';
import Book from '../models/BookSchema.js';

const GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes';

// FETCH: Fetch books from Google Books API
export const fetchBooks = async (req, res) => {
    const { query, maxResults = 10 } = req.query;

    if (!query) {
        return res.status(400).json({ message: 'Query parameter is required' });
    }

    try {
        const response = await axios.get(GOOGLE_BOOKS_API_URL, {
            params: {
                q: query,
                maxResults,
            }
        });

        const booksData = response.data.items;

        if (!booksData) {
            return res.status(404).json({ message: 'No books found' });
        }

        const booksToPreview = booksData.map((item) => {
            const identifiers = item.volumeInfo.industryIdentifiers || [];
            const isbn13 = identifiers.find(id => id.type === 'ISBN_13')?.identifier || null;

            return {
                isbn13,
                title: item.volumeInfo.title || 'Unknown Title',
                author: item.volumeInfo.authors?.[0] || 'Unknown Author', // Changed to single author
                publisher: item.volumeInfo.publisher || 'Unknown Publisher',
                publishedDate: item.volumeInfo.publishedDate || 'Unknown Date',
                description: item.volumeInfo.description || 'No description available',
                pageCount: item.volumeInfo.pageCount || 0,
                genre: item.volumeInfo.categories?.[0] || 'Unknown Genre', // Changed to single genre
                averageRating: item.volumeInfo.averageRating || 0,
                ratingsCount: item.volumeInfo.ratingsCount || 0,
                thumbnail: item.volumeInfo.imageLinks?.thumbnail || '',
                language: item.volumeInfo.language || 'Unknown',
                previewLink: item.volumeInfo.previewLink || '',
                infoLink: item.volumeInfo.infoLink || ''
            };
        });

        res.status(200).json({
            message: `${booksToPreview.length} books fetched successfully.`,
            books: booksToPreview
        });
    } catch (error) {
        console.error('Error fetching books:', error.message);
        res.status(500).json({ message: 'Failed to fetch books', error: error.message });
    }
};

// CREATE: Add a new book
export const createBook = async (req, res) => {
    const { ISBN, title, author, price, stock, description, genre, seller } = req.body;

    try {
        // Create a new book instance
        const newBook = new Book({
            ISBN,
            title,
            author,    // Changed from authors to author for single value
            price,
            stock,
            description,
            genre,     // Changed from categories to genre for single value
            seller     // Seller as reference
        });

        // Save the book to the database
        await newBook.save();

        res.status(201).json({ message: 'Book created successfully', book: newBook });
    } catch (err) {
        res.status(500).json({ message: 'Error creating book', error: err.message });
    }
};

// READ: Get all books
export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching books', error: err.message });
    }
};

// Updated Function to Get Books by Category
export const getBooksByCategory = async (req, res) => {
    const { genre } = req.params;
    try {
        const books = await Book.find({ genre: { $regex: new RegExp(genre, 'i') } }); // Case-insensitive genre matching
        console.log(books);
        
        if (!books.length) {
            return res.status(404).json({ message: `No books found for the genre: ${genre}` });
        }

        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching books by genre', error: err.message });
    }
};


// DELETE: Delete a book by ISBN
export const deleteBook = async (req, res) => {
    const { ISBN } = req.params;

    try {
        const deletedBook = await Book.findOneAndDelete({ ISBN });

        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({ message: 'Book deleted successfully', book: deletedBook });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting book', error: err.message });
    }
};
