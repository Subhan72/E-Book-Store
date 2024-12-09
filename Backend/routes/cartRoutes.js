import express from 'express';
import { addToCart, getCart, updateCartItem, removeFromCart, clearCart } from '../controllers/cartController.js';
import authenticateToken from '../middleware/jwtAuth.js';

const router = express.Router();

router.post('/add-to-cart', authenticateToken, addToCart);
router.get('/get-cart', authenticateToken, getCart);
router.put('/update-cart-item', authenticateToken, updateCartItem);
router.delete('/remove-from-cart', authenticateToken, removeFromCart);
router.delete('/clear-cart', authenticateToken, clearCart);

export default router;