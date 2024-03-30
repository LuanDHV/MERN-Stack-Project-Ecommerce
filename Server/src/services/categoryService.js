// src/services/categoryService.js
import Category from '../models/categoryModel.js';

// Lấy tất cả các danh mục từ cơ sở dữ liệu.
export const getCategories = async () => {
    return await Category.find();
};

// Lấy danh mục con của một danh mục cha cụ thể từ cơ sở dữ liệu.
export const getChildrenCategories = async (parentId) => {
    return await Category.findById(parentId).select('children');
};

// Lấy một danh mục từ cơ sở dữ liệu dựa trên ID.
export const getCategoryById = async (categoryId) => {
    return await Category.findById(categoryId);
};

// Tạo một danh mục mới và lưu vào cơ sở dữ liệu.
export const createCategory = async (categoryData) => {
    const newCategory = new Category(categoryData);
    return await newCategory.save();
};

// Tạo một danh mục con mới và lưu vào cơ sở dữ liệu.
export const createChildCategory = async (parentId, childData) => {
    const parentCategory = await Category.findById(parentId);
    parentCategory.children.push(childData);
    return await parentCategory.save();
};

// Cập nhật một danh mục trong cơ sở dữ liệu.
export const updateCategory = async (categoryId, categoryData) => {
    return await Category.findByIdAndUpdate(categoryId, categoryData, { new: true });
};

// Cập nhật một danh mục con trong cơ sở dữ liệu.
export const updateChildCategory = async (parentId, childId, childData) => {
    const parentCategory = await Category.findById(parentId);
    const childToUpdate = parentCategory.children.id(childId);
    childToUpdate.set(childData);
    return await parentCategory.save();
};

// Xóa một danh mục khỏi cơ sở dữ liệu dựa trên ID.
export const deleteCategory = async (categoryId) => {
    return await Category.findByIdAndDelete(categoryId);
};

// Xóa một danh mục con khỏi cơ sở dữ liệu dựa trên ID của danh mục cha và ID của danh mục con.
export const deleteChildCategory = async (parentId, childId) => {
    const parentCategory = await Category.findById(parentId);
    parentCategory.children.id(childId).remove();
    return await parentCategory.save();
};
