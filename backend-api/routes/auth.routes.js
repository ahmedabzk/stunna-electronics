import express from 'express';
import { signUp, signIn } from '../controllers/auth.controller.js';

const router = express.Router();


router.get("/hello", (req, res) => {
    res.status(200).json("hellooo")
});

router.post("/sign-up",signUp);
router.post("/sign-in",signIn);
router.post("/logout");

export default router;