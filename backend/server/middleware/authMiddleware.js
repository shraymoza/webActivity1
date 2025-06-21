import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const protect = async (req, res, next) => {
    let token;
    const auth = req.headers.authorization;

    if (auth && auth.startsWith('Bearer ')) {
        token = auth.split(' ')[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            return next();
        } catch {
            return res.status(401).json({ message: 'Invalid token' });
        }
    }
    res.status(401).json({ message: 'Not authorized, token missing' });
};
