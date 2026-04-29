import express from "express";
import {
    createAppointment,
    getAllAppointments,
    getSingleAppointment,
    updateAppointmentStatus,
    deleteAppointment,
} from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/", createAppointment);
router.get("/", getAllAppointments);
router.get("/:id", getSingleAppointment);
router.patch("/:id/status", updateAppointmentStatus);
router.delete("/:id", deleteAppointment);

export default router;