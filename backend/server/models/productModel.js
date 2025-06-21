import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        title: {
            type    : String,
            required: [true, 'Product title is required'],
        },
        image: {
            type: String,                   // optional; keep it for the card img
        },
        description: {
            type: String,
        },
        price: {
            type    : Number,
            required: [true, 'Product price is required'],
            min     : [0,   'Price must be positive'],
        },
    },
    { timestamps: true }
);

export default mongoose.model('Product', productSchema);
