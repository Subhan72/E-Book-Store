import express from 'express';
import authenticateToken from '../middleware/jwtAuth.js';
import {
    addBookToWishlist,
    removeBookFromWishlist,
    getAllBooksFromWishlist,
} from '../controllers/wishlistController.js';

const router = express.Router();
console.log('Add to Wishlist route hit');

router.post('/wishlist/add', authenticateToken, addBookToWishlist);

router.delete('/wishlist/remove', authenticateToken, removeBookFromWishlist);


router.get('/wishlist', authenticateToken, getAllBooksFromWishlist);

export default router;
