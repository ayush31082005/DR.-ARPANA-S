import express from "express";
import {
    createAppointment,
    getAllAppointments,
    getSingleAppointment,
    updateAppointmentStatus,
    deleteAppointment,
    sendAppointmentOtp,
    verifyAppointmentOtp,
} from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/send-otp", sendAppointmentOtp);
router.post("/verify-otp", verifyAppointmentOtp);
router.post("/", createAppointment);
router.get("/", getAllAppointments);
router.get("/:id", getSingleAppointment);
router.patch("/:id/status", updateAppointmentStatus);
router.delete("/:id", deleteAppointment);

export default router;
