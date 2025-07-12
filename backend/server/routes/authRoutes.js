import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const router = express.Router();

// Helper
const genToken = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:   [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/User' }
 *     responses:
 *       201: { description: User created }
 */
/* ───────── REGISTER ───────── */
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
        return res.status(400).json({ message: 'All fields required' });

    try {
        if (await User.findOne({ email }))
            return res.status(400).json({ message: 'User already exists' });

        const user = await User.create({ name, email, password });
        res.status(201).json({
            user:  { _id: user._id, name: user.name, email: user.email },
            token: genToken(user._id),
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/* ───────── LOGIN ───────── */
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password)))
            return res.status(401).json({ message: 'Invalid credentials' });

        res.json({
            user:  { _id: user._id, name: user.name, email: user.email },
            token: genToken(user._id),
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
