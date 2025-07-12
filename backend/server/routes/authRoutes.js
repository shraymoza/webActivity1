import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const router = express.Router();

// Helper
const genToken = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User registration & login
 */

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
 *           example:
 *             name:     "Bob Lee"
 *             email:    "bob@example.com"
 *             password: "Str0ngPass!"
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

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in and receive a JWT
 *     tags:   [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:    { type: string, format: email }
 *               password: { type: string, format: password }
 *           example:
 *             email:    "alice@example.com"
 *             password: "Str0ngPass!"
 *     responses:
 *       200:
 *         description: Login success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 token:   { type: string }
 *             example:
 *               success: true
 *               token:   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401: { description: Invalid credentials }
 */
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
