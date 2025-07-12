import express from 'express';
import Product from '../models/productModel.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags:   [Products]
 *     security: [bearerAuth: []]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Product' }
 *           example:
 *             name:         "Google Pixel 9"
 *             price:        799
 *             description:  "Next-gen Pixel"
 *             category:     "Electronics"
 *             countInStock: 20
 *     responses:
 *       201: { description: Created }
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
 * /api/products:
 *   get:
 *     summary: Retrieve all products
 *     tags:   [Products]
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data:
 *                   type:  array
 *                   items: { $ref: '#/components/schemas/Product' }
 *             example:
 *               success: true
 *               data:
 *                 - $ref: '#/components/schemas/Product/example'
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

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a single product by id
 *     tags:   [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: string }
 *         required: true
 *     responses:
 *       200:
 *         description: Product found
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Product' }
 *       404: { description: Product not found }
 */
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


/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update an existing product
 *     tags:   [Products]
 *     security: [bearerAuth: []]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: string }
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Product' }
 *           example:
 *             name:  "Pixel 9 Pro"
 *             price: 999
 *     responses:
 *       200: { description: Updated }
 *       404: { description: Product not found }
 */
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


/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags:   [Products]
 *     security: [bearerAuth: []]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: string }
 *         required: true
 *     responses:
 *       200: { description: Deleted }
 *       404: { description: Product not found }
 */
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
