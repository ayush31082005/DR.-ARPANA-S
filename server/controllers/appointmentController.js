import Appointment from "../models/Appointment.js";
import Otp from "../models/Otp.js";
import generateOtp from "../utils/generateOtp.js";
import { sendOtpEmail } from "../utils/Email.js";

const APPOINTMENT_OTP_PURPOSE = "appointment-booking";

export const sendAppointmentOtp = async (req, res) => {
    try {
        const { email, phone } = req.body;

        if (!email || !phone) {
            return res.status(400).json({
                success: false,
                message: "Email and phone are required",
            });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const normalizedPhone = phone.trim();
        const otp = generateOtp();

        await Otp.deleteMany({ email: normalizedEmail, purpose: APPOINTMENT_OTP_PURPOSE });

        await Otp.create({
            email: normalizedEmail,
            phone: normalizedPhone,
            purpose: APPOINTMENT_OTP_PURPOSE,
            otp,
            expiresAt: Date.now() + 5 * 60 * 1000,
        });

        await sendOtpEmail(normalizedEmail, otp);

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully to your email",
        });
    } catch (error) {
        console.error("Send Appointment OTP Error:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Server error while sending appointment OTP",
        });
    }
};

export const verifyAppointmentOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Email and OTP are required",
            });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const otpData = await Otp.findOne({
            email: normalizedEmail,
            purpose: APPOINTMENT_OTP_PURPOSE,
        });

        if (!otpData) {
            return res.status(400).json({
                success: false,
                message: "OTP not found. Please request a new OTP",
            });
        }

        if (otpData.expiresAt < Date.now()) {
            await Otp.deleteMany({ email: normalizedEmail, purpose: APPOINTMENT_OTP_PURPOSE });
            return res.status(400).json({
                success: false,
                message: "OTP expired. Please request a new OTP",
            });
        }

        if (otpData.otp !== otp.trim()) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        otpData.isVerified = true;
        await otpData.save();

        return res.status(200).json({
            success: true,
            message: "OTP verified successfully",
        });
    } catch (error) {
        console.error("Verify Appointment OTP Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while verifying appointment OTP",
        });
    }
};

export const createAppointment = async (req, res) => {
    try {
        const {
            name,
            phone,
            email,
            clinic,
            clinicAddress,
            dob,
            zipCode,
            gender,
            service,
            doctor,
            date,
            time,
            notes,
        } = req.body;

        if (!name || !phone || !service || !doctor || !date || !time) {
            return res.status(400).json({
                success: false,
                message: "Name, phone, service, doctor, date and time are required",
            });
        }

        const normalizedEmail = email?.trim().toLowerCase();
        const otpData = await Otp.findOne({
            email: normalizedEmail,
            purpose: APPOINTMENT_OTP_PURPOSE,
            isVerified: true,
        });

        if (!normalizedEmail || !otpData) {
            return res.status(400).json({
                success: false,
                message: "Please verify your email with OTP before booking the appointment",
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
            name: name.trim(),
            phone: phone.trim(),
            email: normalizedEmail,
            clinic: clinic?.trim(),
            clinicAddress: clinicAddress?.trim(),
            dob,
            zipCode: zipCode?.trim(),
            gender: gender?.trim(),
            service: service.trim(),
            doctor: doctor.trim(),
            date,
            time: time.trim(),
            notes: notes?.trim(),
        });

        await Otp.deleteMany({ email: normalizedEmail, purpose: APPOINTMENT_OTP_PURPOSE });

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
