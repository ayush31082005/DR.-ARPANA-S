import express from "express";
import {
    createPrescription,
    getPrescriptionUploadStatus,
    getAllPrescriptions,
    getSinglePrescription,
    updatePrescriptionStatus,
} from "../controllers/prescriptionController.js";
import { uploadPrescriptionFile } from "../middleware/uploadMiddleware.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/upload-status", getPrescriptionUploadStatus);
router.post("/", uploadPrescriptionFile, createPrescription);
router.get("/", protect, getAllPrescriptions);
router.get("/:id", protect, getSinglePrescription);
router.patch("/:id/status", protect, authorizeRoles("admin"), updatePrescriptionStatus);

export default router;
