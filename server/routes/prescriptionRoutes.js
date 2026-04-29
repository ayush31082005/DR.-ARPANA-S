import express from "express";
import {
    createPrescription,
    getPrescriptionUploadStatus,
    getAllPrescriptions,
    getSinglePrescription,
    updatePrescriptionStatus,
} from "../controllers/prescriptionController.js";
import { uploadPrescriptionFile } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/upload-status", getPrescriptionUploadStatus);
router.post("/", uploadPrescriptionFile, createPrescription);
router.get("/", getAllPrescriptions);
router.get("/:id", getSinglePrescription);
router.patch("/:id/status", updatePrescriptionStatus);

export default router;
