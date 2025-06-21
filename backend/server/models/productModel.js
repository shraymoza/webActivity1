import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name:        { type: String, required: true },
        description: { type: String },
        price:       { type: Number, required: true },
    },
    { timestamps: true }
);

export default mongoose.model('Product', productSchema);
