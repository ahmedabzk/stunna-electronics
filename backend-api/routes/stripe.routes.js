import express from 'express';
import { stripePayment,webhookFunc } from '../controllers/stripePayment.controller.js';
import verifyToken from '../utils/jwt.js';

const router = express.Router();

router.post("/create-checkout-session", stripePayment);
router.post(
  "/webhook",
//   express.json({ type: "application/json" }),
  webhookFunc
);

export default router;