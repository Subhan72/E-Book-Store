import mongoose from 'mongoose';
import Cart from '../models/cartSchema.js';
import Book from '../models/BookSchema.js';
import Customer from '../models/customerSchema.js'; // Import the Customer model

export const addToCart = async (req, res) => {
    const { bookId, quantity } = req.body;

    console.log("In addBookToCart, received data:", { bookId, quantity });

    if (!bookId || !quantity || quantity <= 0) {
        return res.status(400).json({ message: 'Invalid book details or quantity provided' });
    }

    try {
       
        const userId = req.user.id;
        const user = await Customer.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find or create the user's cart
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        // Cleanup invalid entries in cart.items
        cart.items = cart.items.filter((item) => item && item.bookId);

        // Check if the book exists
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Check if the book is already in the cart
        const existingItemIndex = cart.items.findIndex((item) => item.bookId.toString() === bookId);

        if (existingItemIndex > -1) {
            // Update quantity and total for existing item
            const existingItem = cart.items[existingItemIndex];
            existingItem.quantity += quantity;
            existingItem.total = existingItem.quantity * book.price;
        } else {
            // Add a new item to the cart
            const newItem = {
                bookId: book._id,
                title: book.title,
                authors: book.author, // Assuming `book.author` is an array
                price: book.price,
                quantity,
                isbn: book.ISBN,
                total: book.price * quantity,
            };
            cart.items.push(newItem);
        }

        // Save the cart
        await cart.save();

        res.status(200).json({ message: 'Book added to cart successfully', cart });
    } catch (err) {
        console.error('Error in addBookToCart:', err);
        res.status(500).json({ message: 'Error adding book to cart', error: err.message });
    }
};

// Get User's Cart
export const getCart = async (req, res) => {
    const userId = req.user.id; // Get userId from the authentication middleware

    try {
        // Check if the cart exists
        let cart = await Cart.findOne({ userId }).populate('items.bookId');

        // If cart doesn't exist, create an empty one for the user
        if (!cart) {
            cart = new Cart({ userId, items: [] });
            await cart.save();
        }

        res.status(200).json(cart);
    } catch (error) {
        console.error('Error fetching cart:', error.message);
        res.status(500).json({ message: 'Failed to fetch cart.', error: error.message });
    }
};




// Remove Item from Cart
export const removeFromCart = async (req, res) => {
    const { bookId } = req.body;
    const userId = req.user.id;  // Assuming `userId` is set by the middleware (authenticateToken)
    
    console.log("BookId: ",bookId._id);
    if (!bookId) {
        return res.status(400).json({ message: 'Book ID is required.' });
    }

    try {
        // Find the cart by userId
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found.' });
        }

        // If the cart has no items
        if (cart.items.length === 0) {
            return res.status(404).json({ message: 'No items in cart to remove.' });
        }
        
        // Find the index of the bookId to be removed
        const itemIndex = cart.items.findIndex((item) => item.bookId.toString() === bookId);

        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Book not found in cart.' });
        }

        // Remove the item from the cart
        cart.items.splice(itemIndex, 1);

        // Recalculate the subtotal
        cart.subTotal = cart.items.reduce((acc, item) => acc + item.total, 0);
        cart.updatedAt = Date.now();

        // Save the cart after the update
        await cart.save();

        return res.status(200).json({ message: 'Book removed from cart successfully.', cart });
    } catch (error) {
        console.error('Error removing from cart:', error.message);
        return res.status(500).json({ message: 'Failed to remove book from cart.', error: error.message });
    }
};



// Clear Cart (Empty the cart)
export const clearCart = async (req, res) => {
    const userId = req.userId;  // Get userId from the JWT token (set by middleware)

    try {
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found.' });
        }

        // Clear the cart
        cart.items = [];

        await cart.save();
        res.status(200).json({ message: 'Cart cleared successfully.', cart });
    } catch (error) {
        console.error('Error clearing cart:', error.message);
        res.status(500).json({ message: 'Failed to clear cart.', error: error.message });
    }
};



// Update Cart Item (Change Quantity)
export const updateCartItem = async (req, res) => {
    const { bookId, quantity } = req.body;
    const userId = req.user.id;

    if (!bookId || quantity === undefined) {
        return res.status(400).json({ message: 'Book ID and Quantity are required.' });
    }

    try {
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found.' });
        }

        const itemIndex = cart.items.findIndex((item) => item.bookId.toString() === bookId);

        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Book not found in cart.' });
        }

        if (quantity <= 0) {
            // Remove the item if quantity is 0 or less
            cart.items.splice(itemIndex, 1);
        } else {
            // Update the quantity and total
            cart.items[itemIndex].quantity = quantity;
            cart.items[itemIndex].total = cart.items[itemIndex].price * quantity;
        }

        await cart.save();
        res.status(200).json({ message: 'Cart updated successfully.', cart });
    } catch (error) {
        console.error('Error updating cart:', error.message);
        res.status(500).json({ message: 'Failed to update cart.', error: error.message });
    }
};