import express from 'express';
import { createItem, getFeaturedItems, getItemById, getRecommended } from '../controllers/items.controller.js';

const router = express.Router();

router.post("/create", createItem);
router.get("/get/featured", getFeaturedItems);
router.get("/get/recommended", getRecommended);
router.get("/get/:id", getItemById);

export default router;