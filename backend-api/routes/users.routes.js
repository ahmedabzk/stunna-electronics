import express from "express";
import { getAllUsers, getUserById, updateUserById } from "../controllers/user.controller.js";
import verifyToken from "../utils/jwt.js";

const router = express.Router();

router.get('/', getAllUsers);
router.post("/update/:id", verifyToken, updateUserById);
router.get('/get/:id', getUserById);



export default router;