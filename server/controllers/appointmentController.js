import Appointment from "../models/Appointment.js";

export const createAppointment = async (req, res) => {
    try {
        const { name, phone, email, dob, service, doctor, date, time, notes } = req.body;

        if (!name || !phone || !service || !doctor || !date || !time) {
            return res.status(400).json({
                success: false,
                message: "Name, phone, service, doctor, date and time are required",
            });
        }

        const alreadyBooked = await Appointment.findOne({
            doctor,
            date,
            time,
            status: { $ne: "cancelled" },
        });

        if (alreadyBooked) {
            return res.status(409).json({
                success: false,
                message: "This doctor is already booked for this time slot",
            });
        }

        const appointment = await Appointment.create({
            name,
            phone,
            email,
            dob,
            service,
            doctor,
            date,
            time,
            notes,
        });

        return res.status(201).json({
            success: true,
            message: "Appointment booked successfully",
            appointment,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

export const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: appointments.length,
            appointments,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

export const getSingleAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found",
            });
        }

        return res.status(200).json({
            success: true,
            appointment,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

export const updateAppointmentStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const allowedStatus = ["pending", "confirmed", "cancelled", "completed"];

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status",
            });
        }

        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Appointment status updated",
            appointment,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

export const deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Appointment deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};