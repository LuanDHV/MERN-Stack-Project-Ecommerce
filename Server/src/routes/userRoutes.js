// src/routes/userRoutes.js
import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

// Lấy tất cả người dùng
router.get('/', userController.getUsers);

// Lấy một người dùng cụ thể
router.get('/:id', userController.getUserById);

// Thêm một người dùng mới
router.post('/', userController.createUser);

// Cập nhật một người dùng
router.put('/:id', userController.updateUser);

// Lấy người dùng bằng email
router.get('/email/:email', userController.getUserByEmail);

// Xóa một người dùng 
router.delete('/:id', userController.deleteUser);

// Đăng ký
router.post('/register', userController.registerUser);

// Đăng nhập
router.post('/login', userController.loginUser);



export default router;
