import Appointment from "../models/Appointment.js";
import Contact from "../models/Contact.js";
import Order from "../models/Order.js";
import Prescription from "../models/Prescription.js";
import User from "../models/User.js";

export const getAdminStats = async (req, res) => {
    try {
        const [contacts, prescriptions, orders, users] = await Promise.all([
            Contact.countDocuments(),
            Prescription.countDocuments(),
            Order.countDocuments(),
            User.countDocuments(),
        ]);

        return res.status(200).json({
            success: true,
            stats: {
                contacts,
                prescriptions,
                orders,
                users,
            },
        });
    } catch (error) {
        console.error("Admin stats error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch admin stats",
        });
    }
};

export const getAdminOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            orders,
        });
    } catch (error) {
        console.error("Admin orders error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch admin orders",
        });
    }
};

export const getAdminAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            appointments,
        });
    } catch (error) {
        console.error("Admin appointments error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch appointments",
        });
    }
};

export const updateAdminAppointmentStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const allowedStatuses = ["pending", "confirmed", "cancelled", "completed"];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid appointment status",
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
        console.error("Admin appointment status error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update appointment status",
        });
    }
};

export const updateAdminOrderStatus = async (req, res) => {
    try {
        const { orderStatus } = req.body;
        const allowedStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];

        if (!allowedStatuses.includes(orderStatus)) {
            return res.status(400).json({
                success: false,
                message: "Invalid order status",
            });
        }

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { orderStatus },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Order status updated",
            order,
        });
    } catch (error) {
        console.error("Admin order status error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update order status",
        });
    }
};
