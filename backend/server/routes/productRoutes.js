import express from 'express';
import Product from '../models/productModel.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary:      Create a new product
 *     tags:         [Products]
 *     security:     [bearerAuth: []]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Product' }
 *     responses:
 *       201:
 *         description: Product created
 */
/* ───────── CREATE ───────── */
router.post('/', protect, async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary:      Retrieve all products
 *     tags:         [Products]
 *     responses:
 *       200:
 *         description: A JSON array of product objects
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/Product' }
 */
/* ───────── READ all (pagination + search + sort) ───────── */
router.get('/', protect, async (req, res) => {
    const page    = Number(req.query.page)   || 1;
    const limit   = Number(req.query.limit)  || 10;
    const sort    =            req.query.sort    || '-createdAt';
    const keyword = req.query.keyword
        ? { title: { $regex: req.query.keyword, $options: 'i' } }
        : {};

    try {
        const total    = await Product.countDocuments(keyword);
        const products = await Product.find(keyword)
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(limit);

        res.json({
            page,
            pages: Math.ceil(total / limit),
            total,
            data: products,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/* ───────── READ one ───────── */
router.get('/:id', protect, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/* ───────── UPDATE ───────── */
router.put('/:id', protect, async (req, res) => {
    try {
        const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/* ───────── DELETE ───────── */
router.delete('/:id', protect, async (req, res) => {
    try {
        const deleted = await Product.findByIdAndDelete(req.params.id);
        res.json(deleted);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
