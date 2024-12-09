import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js'; 
import cartRoutes from './routes/cartRoutes.js'; 
import wishlistRoutes from './routes/wishlistRoutes.js'; 



dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGOURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.log('MongoDB connection error:', error));

app.use('/', authRoutes);
app.use('/', bookRoutes); 
app.use('/', cartRoutes); 
app.use('/', wishlistRoutes); 

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
