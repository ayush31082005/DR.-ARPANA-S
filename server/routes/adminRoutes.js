import express from "express";
import {
    changeAdminPassword,
    createAdminByAdmin,
    getAllAdmins,
    getAdminAppointments,
    getAdminOrders,
    getAdminProfile,
    getAdminStats,
    sendAdminCreationOtp,
    updateAdminProfile,
    updateAdminAppointmentStatus,
    updateAdminOrderStatus,
    verifyAdminCreationOtp,
} from "../controllers/adminController.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect, authorizeRoles("admin"));

router.get("/admins", getAllAdmins);
router.get("/profile", getAdminProfile);
router.patch("/profile", updateAdminProfile);
router.patch("/change-password", changeAdminPassword);
router.post("/admins", createAdminByAdmin);
router.post("/admins/send-otp", sendAdminCreationOtp);
router.post("/admins/verify-otp", verifyAdminCreationOtp);
router.get("/stats", getAdminStats);
router.get("/appointments", getAdminAppointments);
router.get("/orders", getAdminOrders);
router.patch("/appointments/:id/status", updateAdminAppointmentStatus);
router.patch("/orders/:id/status", updateAdminOrderStatus);

export default router;
