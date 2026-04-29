import express from "express";
import {
    createCashOnDeliveryOrder,
    getMyOrders,
    getSingleMyOrder,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createCashOnDeliveryOrder);
router.get("/my", protect, getMyOrders);
router.get("/:id", protect, getSingleMyOrder);

export default router;
