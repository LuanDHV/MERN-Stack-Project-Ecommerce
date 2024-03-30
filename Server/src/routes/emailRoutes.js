// src/routes/emailRoutes.js
import express from 'express';
import * as emailController from '../controllers/emailController.js';


const router = express.Router();

// Gửi email
router.post('/', emailController.sendOTPEmailController);



export default router;
