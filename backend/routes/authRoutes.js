const express = require('express');
const authController = require('../controllers/authController'); // Change this import
const router = express.Router();

// Register route
router.post('/register', authController.registerAdmin);

// Login route
router.post('/login', authController.loginAdmin);

// Logout route
router.post('/logout', authController.logoutAdmin);

// Update Profile route
router.put('/update-profile', authController.updateProfile);

module.exports = router;