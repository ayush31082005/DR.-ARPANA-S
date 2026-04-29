import express from "express";
import {
    sendRegisterOtp,
    verifyOtpAndRegister,
    loginUser,
    forgotPassword,
    verifyResetOtp,
    resetPassword,
    getMe,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/send-otp", sendRegisterOtp);
router.post("/verify-otp", verifyOtpAndRegister);
router.post("/login", loginUser);

router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-otp", verifyResetOtp);
router.post("/reset-password", resetPassword);

router.get("/me", protect, getMe);

export default router;
