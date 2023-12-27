import express from 'express';
import { createItem, getFeaturedItems } from '../controllers/items.controller.js';

const router = express.Router();

router.post("/create", createItem);
router.get("/get/featured", getFeaturedItems);

export default router;