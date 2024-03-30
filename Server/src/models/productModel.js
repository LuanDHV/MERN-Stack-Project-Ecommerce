// src/models/productModel.js
import mongoose, { Schema } from 'mongoose';

// Định nghĩa schema cho Product
const productSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    images: [{ type: String, required: true }],
    colors: [{ type: String }],
    sizes: [{ type: String }],
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category', required: true }],
    countInStock: { type: Number, required: true },
});

// Tạo model Product từ schema đã định nghĩa
const Product = mongoose.model('Product', productSchema);

export default Product;
