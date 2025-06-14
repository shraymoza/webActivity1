// /server/index.js
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://shray:Shray@97@cluster0.ypzpcbp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
    .catch(err => console.error(err));

const app = express();
app.use(cors());
app.use(express.json());

// In‑memory store (id is Date.now()).
let products = [];

/* CREATE */
app.post('/api/products', (req, res) => {
    const { title, description, image, price } = req.body;
    if (!title || !image || !description || !price)
        return res.status(400).json({ message: 'All fields required' });
    const newProd = { id: Date.now(), title, description, image, price };
    products.unshift(newProd);
    return res.status(201).json(newProd);
});

/* READ ALL */
app.get('/api/products', (_req, res) => res.json(products));

/* READ ONE */
app.get('/api/products/:id', (req, res) => {
    const found = products.find(p => p.id === +req.params.id);
    return found ? res.json(found) : res.status(404).json({ message: 'Not found' });
});

/* UPDATE */
app.put('/api/products/:id', (req, res) => {
    const i = products.findIndex(p => p.id === +req.params.id);
    if (i === -1) return res.status(404).json({ message: 'Not found' });
    products[i] = { ...products[i], ...req.body };
    return res.json(products[i]);
});

/* DELETE */
app.delete('/api/products/:id', (req, res) => {
    const i = products.findIndex(p => p.id === +req.params.id);
    if (i === -1) return res.status(404).json({ message: 'Not found' });
    const removed = products.splice(i, 1);
    return res.json(removed[0]);
});

app.listen(4000, () => console.log('API ready on http://localhost:4000'));
