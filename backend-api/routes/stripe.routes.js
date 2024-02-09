import express from 'express';
import { stripePayment } from '../controllers/stripePayment.controller.js';
import verifyToken from '../utils/jwt.js';

const router = express.Router();

router.post("/create-checkout-session", stripePayment);

export default router;