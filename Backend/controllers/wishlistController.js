import mongoose from 'mongoose';
import Wishlist from '../models/WishList.js';
import Book from '../models/BookSchema.js';
import Customer from '../models/customerSchema.js'; // Import the Customer model


// Add book to the wishlist
export const addBookToWishlist = async (req, res) => {
    const { bookDetails } = req.body;

    console.log("In addBookToWishlist, bookDetails:", bookDetails);

    if (!bookDetails || !bookDetails.ISBN || !bookDetails.title || !bookDetails.author || !bookDetails.genre) {
        return res.status(400).json({ message: 'Invalid book details provided' });
    }

    try {
        const customer = await Customer.findById(req.user.id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        // Find the wishlist for the user
        let wishlist = await Wishlist.findOne({ user: req.user.id });
        if (!wishlist) {
            wishlist = new Wishlist({
                user: req.user.id,
                books: [],
            });
        }

        // Cleanup invalid entries in wishlist.books
        wishlist.books = wishlist.books.filter((book) => book && book.ISBN);

        // Check if the book is already in the wishlist
        const isBookInWishlist = wishlist.books.some(
            (book) => book.ISBN === bookDetails.ISBN
        );

        if (isBookInWishlist) {
            return res.status(400).json({ message: 'Book already in wishlist' });
        }

        // Add book to wishlist
        wishlist.books.push(bookDetails);
        await wishlist.save();

        res.status(200).json({ message: 'Book added to wishlist successfully', wishlist });
    } catch (err) {
        console.error('Error in addBookToWishlist:', err);
        res.status(500).json({ message: 'Error adding book to wishlist', error: err.message });
    }
};

// Remove a book from the wishlist
export const removeBookFromWishlist = async (req, res) => {
    const { bookISBN } = req.body;  // Expecting bookISBN to be sent in the request body

    try {
        // Find the wishlist for the authenticated user
        const wishlist = await Wishlist.findOne({ user: req.user.id });

        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }

        // Filter out the book with the matching ISBN
        const initialBookCount = wishlist.books.length;
        wishlist.books = wishlist.books.filter((b) => b.ISBN !== bookISBN);  // Compare ISBN

        // If the book was not found in the wishlist
        if (wishlist.books.length === initialBookCount) {
            return res.status(404).json({ message: 'Book not found in wishlist' });
        }

        // Save the updated wishlist
        await wishlist.save();

        res.status(200).json({ message: 'Book removed from wishlist', wishlist });
    } catch (err) {
        res.status(500).json({ message: 'Error removing book from wishlist', error: err.message });
    }
};

// Get all books from the wishlist
export const getAllBooksFromWishlist = async (req, res) => {
    try {
        // Find the user's wishlist
        const wishlist = await Wishlist.findOne({ user: req.user.id }).populate('user', 'name email'); // Populates user info if needed
        
        if (!wishlist) {
            return res.status(404).json({ message: 'No books found in the wishlist' });
        }

        // Return the books in the wishlist
        res.status(200).json({ message: 'Wishlist retrieved successfully', books: wishlist.books });
    } catch (err) {
        console.error('Error in getAllBooks:', err);
        res.status(500).json({ message: 'Error retrieving wishlist', error: err.message });
    }
};
