import mongoose from 'mongoose';
import dotenv   from 'dotenv';
import swaggerDocs from './swagger.js';
import authRoutes    from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import express from 'express';
import cors     from 'cors';
import { corsOptions } from './corsOptions.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


// CORS BEFORE any route/middleware that needs it
app.use(cors(corsOptions));

// ───────── DB connect ─────────
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Mongo error →', err));

// ───────── Routes ─────────
app.use('/api/auth',     authRoutes);
app.use('/api/products', productRoutes);
swaggerDocs(app);
// ───────── Boot up ─────────
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API ready on :${PORT}`));
