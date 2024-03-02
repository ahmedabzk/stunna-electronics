import express from 'express';
import { getYourOrders } from '../controllers/order.controller.js';
import verifyToken from '../utils/jwt.js';

const router = express.Router();

router.get('/get/order/:id', verifyToken, getYourOrders);

export default router;