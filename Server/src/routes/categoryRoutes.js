import express from 'express';
import * as categoryController from '../controllers/categoryController.js';

const router = express.Router();

// Lấy tất cả danh mục
router.get('/', categoryController.getCategories);

// Lấy danh mục con của một danh mục cụ thể
router.get('/:id/children', categoryController.getChildrenCategories);

// Lấy một danh mục cụ thể
router.get('/:id', categoryController.getCategoryById);

// Thêm một danh mục mới (bao gồm cả danh mục con)
router.post('/', categoryController.createCategory);

// Thêm danh mục con cho một danh mục cha cụ thể
router.post('/:id/children', categoryController.createChildCategory);

// Cập nhật một danh mục
router.put('/:id', categoryController.updateCategory);

// Cập nhật danh mục con của một danh mục cha cụ thể
router.put('/:parentId/children/:childId', categoryController.updateChildCategory);

// Xóa một danh mục
router.delete('/:id', categoryController.deleteCategory);

// Xóa danh mục con của một danh mục cha cụ thể
router.delete('/:parentId/children/:childId', categoryController.deleteChildCategory);

export default router;
