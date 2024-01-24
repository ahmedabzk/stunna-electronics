import express from "express";
import { updateUserById } from "../controllers/user.controller.js";
import verifyToken from "../utils/jwt.js";

const router = express.Router();

router.post("/update/:id", verifyToken, updateUserById);




export default router;