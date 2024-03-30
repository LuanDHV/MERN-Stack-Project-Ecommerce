// categoryModel.js
import mongoose, { Schema } from 'mongoose';

// Định nghĩa schema cho Category
const categorySchema = new Schema({
    name: { type: String, required: true, unique: true },  // Tên danh mục, yêu cầu và duy nhất
    children: [
        {
            name: { type: String, required: true }  // Tên của danh mục con, yêu cầu
        }
    ]
});

// Tạo model Category từ schema đã định nghĩa
const Category = mongoose.model('Category', categorySchema);

export default Category;
