import express from 'express';
import {getIphoneProducts, getProductById, getSamsungProducts, getAllProducts, getHpLaptops, getMacbookLaptops,getAllLaptops } from '../controllers/products.controller.js';


const router = express.Router();

router.get("/get/iphone", getIphoneProducts);
router.get("/get/samsung", getSamsungProducts);
router.get("/get/hp", getHpLaptops);
router.get("/get/macbook", getMacbookLaptops);
router.get("/get/laptops", getAllLaptops);
router.get("/get/all", getAllProducts);
router.get("/get/:id", getProductById);


export default router;