const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const catalogRoutes = require('./routes/catalogRoutes');
const cors = require('cors');

dotenv.config();
const app = express();

// Connect to the database
connectDB();
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Use the routes
app.use('/api/auth', authRoutes);
app.use('/api/catalog', catalogRoutes);

module.exports = app;
