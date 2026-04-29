import express from "express";
import {
    createContactMessage,
    getAllContactMessages,
    updateContactStatus,
    deleteContactMessage,
} from "../controllers/contactController.js";

const router = express.Router();

router.post("/", createContactMessage);
router.get("/", getAllContactMessages);
router.patch("/:id/status", updateContactStatus);
router.delete("/:id", deleteContactMessage);

export default router;