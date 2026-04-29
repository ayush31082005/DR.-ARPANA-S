import Contact from "../models/Contact.js";

export const createContactMessage = async (req, res) => {
    try {
        const { name, phone, email, message } = req.body;

        if (!name || !phone || !message) {
            return res.status(400).json({
                success: false,
                message: "Name, phone and message are required",
            });
        }

        const contact = await Contact.create({
            name,
            phone,
            email,
            message,
        });

        res.status(201).json({
            success: true,
            message: "Message sent successfully",
            contact,
        });
    } catch (error) {
        console.error("Contact create error:", error);
        res.status(500).json({
            success: false,
            message: "Server error while sending message",
        });
    }
};

export const getAllContactMessages = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            contacts,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch messages",
        });
    }
};

export const updateContactStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!["new", "read", "replied"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status",
            });
        }

        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Message not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Status updated",
            contact,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update status",
        });
    }
};

export const deleteContactMessage = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Message not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Message deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete message",
        });
    }
};