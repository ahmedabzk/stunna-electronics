import express from 'express';
import { createProduct, getAll,productById,updateProductById,deleteProduct } from '../../controllers/admin/products.js';
import { getAllUsers, getUserById } from '../../controllers/admin/users.js';
import { getAllOrders,updateOrder } from '../../controllers/admin/orders.js';

const router = express.Router();

router.post("/create/product", createProduct);
router.get("/products/all", getAll);
router.get("/users/all", getAllUsers);
router.get("/orders/all",getAllOrders);


router.get("/user/:id", getUserById);
router.get("/products/:id", productById);
router.get("/orders/:id", updateOrder);
router.post("/products/update/:id", updateProductById);
router.delete("/products/delete/:id",deleteProduct);

export default router;