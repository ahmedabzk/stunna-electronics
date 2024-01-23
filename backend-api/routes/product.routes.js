import express from 'express';
import { createProduct, getFeaturedProducts, getProductById, getRecommendedProducts, getAllProducts } from '../controllers/products.controller.js';


const router = express.Router();

router.post("/create", createProduct);
router.get("/get/featured", getFeaturedProducts);
router.get("/get/recommended", getRecommendedProducts);
router.get("/get/all", getAllProducts);
router.get("/get/:id", getProductById);


export default router;