import express from "express";
import { getAllUsers, getUserById } from "../controllers/user.controller.js";
import verifyToken from "../utils/jwt.js";

const router = express.Router();

router.get('/', getAllUsers);
router.post("/update/:id",verifyToken, getUserById);
router.get('/:id', getUserById);


export default router;