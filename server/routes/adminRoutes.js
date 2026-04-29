import express from "express";
import {
    getAdminOrders,
    getAdminStats,
    updateAdminOrderStatus,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/stats", getAdminStats);
router.get("/orders", getAdminOrders);
router.patch("/orders/:id/status", updateAdminOrderStatus);

export default router;
