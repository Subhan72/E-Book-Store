import jwt from 'jsonwebtoken';

// Middleware to authenticate and extract userId from JWT
export const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];  // Bearer <token>

    if (!token) {
        return res.status(403).json({ message: 'Access denied. No token provided.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token.' });
        }
        req.userId = decoded.userId;  // Add userId to the request object
        next();
    });
};


const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Access token required' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user; // Attach user info to the request object
        next();
    });
};

export default authenticateToken;

