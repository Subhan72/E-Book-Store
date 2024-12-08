const Admin = require('../models/Admin');
const generateToken = require('../config/jwt');
const bcrypt = require('bcryptjs');

// Ensure each function is explicitly exported
exports.registerAdmin = async (req, res) => {
  try {
    const { username, email, password, isAdmin } = req.body;
    
    // Check if admin already exists
    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: 'Admin already exists with this email' });
    }
    
    // Create new admin
    const newAdmin = new Admin({
      username,
      email,
      password,
      isAdmin
    });
    
    // Save the new admin to the database
    await newAdmin.save();
    
    // Generate token for the newly created admin
    const token = generateToken(newAdmin._id);
    
    // Respond with the token
    res.status(201).json({
      message: 'Admin registered successfully',
      token,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration', error: error.message });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find the admin by email
    const admin = await Admin.findOne({ email });
    
    // Check if admin exists
    if (!admin) {
      return res.status(400).json({ message: 'Invalid email' });
    }
    
    // Check password
    const isMatch = await admin.matchPassword(password);
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }
    
    // Generate token
    const token = generateToken(admin._id);
    
    res.json({ 
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
};

exports.logoutAdmin = (req, res) => {
  res.json({ message: 'Logged out successfully' });
};

exports.updateProfile = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const adminId = req.admin.id;
    
    const admin = await Admin.findById(adminId);
    
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    
    if (username) admin.username = username;
    if (email) admin.email = email;
    if (password) admin.password = password; 
    
    await admin.save();
    
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error during profile update', error: error.message });
  }
};