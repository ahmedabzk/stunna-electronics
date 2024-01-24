import express from 'express';
import { createProduct, getAll } from '../../controllers/admin/products.js';
import { getAllUsers,getUserById } from '../../controllers/admin/users.js';

const router = express.Router();

router.post("/create/product", createProduct);
router.get("/products/all", getAll);

router.get("/users/all", getAllUsers);
router.get("/user/:id", getUserById);

export default router;