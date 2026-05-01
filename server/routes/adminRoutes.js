import express from "express";
import {
    getAdminAppointments,
    getAdminOrders,
    getAdminStats,
    updateAdminAppointmentStatus,
    updateAdminOrderStatus,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/stats", getAdminStats);
router.get("/appointments", getAdminAppointments);
router.get("/orders", getAdminOrders);
router.patch("/appointments/:id/status", updateAdminAppointmentStatus);
router.patch("/orders/:id/status", updateAdminOrderStatus);

export default router;
