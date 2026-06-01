import express from "express";
import {
    changeAdminPassword,
    createAdminByAdmin,
    getAllAdmins,
    getAdminAppointments,
    getAdminProfile,
    getAdminStats,
    sendAdminCreationOtp,
    updateAdminProfile,
    updateAdminAppointmentStatus,
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
router.patch("/appointments/:id/status", updateAdminAppointmentStatus);

export default router;
