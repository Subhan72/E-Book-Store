import Customer from '../models/customerSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const { username, email, password, phoneNumber, address } = req.body;

    try {
        const existingCustomer = await Customer.findOne({ email });
        if (existingCustomer) return res.status(400).json({ message: 'Customer already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const customer = new Customer({ 
            username, 
            email, 
            password: hashedPassword, 
            phoneNumber, 
            address 
        });
        await customer.save();

        res.json({ message: 'Customer registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const customer = await Customer.findOne({ email });
        if (!customer) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, customer.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign(
            { id: customer._id, username: customer.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};

