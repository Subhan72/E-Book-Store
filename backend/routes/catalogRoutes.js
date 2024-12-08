const express = require('express');
const {
  createBook,
  searchAndImportBooks,
  bulkImportBooks,
  updateBookData,
  getBooks,
  updateStock,
  updatePriceAndDiscount,
  updateBookStatus,
  updateBookImage,
  updateCustomTagsAndCategory,
} = require('../controllers/catalogController');
const { protect, adminOnly } = require('../middleware/authMiddleware');


const router = express.Router();

// Admin-protected routes
router.post('/addbook', protect, adminOnly, createBook);
router.get('/search', protect, adminOnly, searchAndImportBooks);
router.post('/bulk-import', protect, adminOnly, bulkImportBooks);
router.put('/update/:isbn', protect, adminOnly, updateBookData);
router.get('/books', protect, getBooks);
router.put('/stock/:isbn', protect, adminOnly, updateStock);
router.put('/price-discount/:isbn', protect, adminOnly, updatePriceAndDiscount);
router.put('/status/:isbn', protect, adminOnly, updateBookStatus);
router.put('/image/:isbn', protect, adminOnly, updateBookImage);
router.put('/category-tags/:isbn', protect, adminOnly, updateCustomTagsAndCategory);

module.exports = router;
