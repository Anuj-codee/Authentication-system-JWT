import { Router } from "express";
import * as authController from "../controllers/authController.js";

const router = Router();

router.post('/register', authController.registerUser);

router.get('/get-me',authController.getMe);

router.post('/refresh-token', authController.refreshToken);

export default router;