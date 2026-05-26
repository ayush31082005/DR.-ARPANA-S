import express from "express";
import {
    createContactMessage,
    getAllContactMessages,
    updateContactStatus,
    deleteContactMessage,
} from "../controllers/contactController.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createContactMessage);
router.get("/", protect, authorizeRoles("admin"), getAllContactMessages);
router.patch("/:id/status", protect, authorizeRoles("admin"), updateContactStatus);
router.delete("/:id", protect, authorizeRoles("admin"), deleteContactMessage);

export default router;
