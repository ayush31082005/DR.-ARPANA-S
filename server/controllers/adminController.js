import Appointment from "../models/Appointment.js";
import Contact from "../models/Contact.js";
import Otp from "../models/Otp.js";
import Prescription from "../models/Prescription.js";
import User from "../models/User.js";
import generateOtp from "../utils/generateOtp.js";
import { sendOtpEmail } from "../utils/Email.js";

const buildAdminResponse = (user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role || "admin",
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
});

const getLastSixMonthBuckets = () => {
    const now = new Date();
    const buckets = [];

    for (let offset = 5; offset >= 0; offset -= 1) {
        const date = new Date(now.getFullYear(), now.getMonth() - offset, 1);
        buckets.push({
            key: `${date.getFullYear()}-${date.getMonth()}`,
            label: date.toLocaleString("en-US", { month: "short" }),
        });
    }

    return buckets;
};

export const getAdminStats = async (req, res) => {
    try {
        const [contacts, prescriptions, appointments, users, allContacts, allPrescriptions, allAppointments, allUsers] = await Promise.all([
            Contact.countDocuments(),
            Prescription.countDocuments(),
            Appointment.countDocuments(),
            User.countDocuments(),
            Contact.find().select("status createdAt"),
            Prescription.find().select("status createdAt"),
            Appointment.find().select("status createdAt"),
            User.find().select("role createdAt"),
        ]);

        const monthBuckets = getLastSixMonthBuckets();

        const appointmentChart = monthBuckets.map((bucket) => {
            const matchingAppointments = allAppointments.filter((appointment) => {
                const date = new Date(appointment.createdAt);
                return `${date.getFullYear()}-${date.getMonth()}` === bucket.key;
            });

            return {
                month: bucket.label,
                appointments: matchingAppointments.length,
            };
        });

        const prescriptionChart = monthBuckets.map((bucket) => {
            const matchingPrescriptions = allPrescriptions.filter((prescription) => {
                const date = new Date(prescription.createdAt);
                return `${date.getFullYear()}-${date.getMonth()}` === bucket.key;
            });

            return {
                month: bucket.label,
                prescriptions: matchingPrescriptions.length,
                approved: matchingPrescriptions.filter((item) => item.status === "approved").length,
                pending: matchingPrescriptions.filter((item) => item.status === "pending").length,
                rejected: matchingPrescriptions.filter((item) => item.status === "rejected").length,
            };
        });

        const adminUsers = allUsers.filter((user) => user.role === "admin").length;
        const regularUsers = allUsers.length - adminUsers;

        const userChart = [
            { name: "Admins", value: adminUsers },
            { name: "Users", value: regularUsers },
        ];

        const contactChart = [
            { name: "New", value: allContacts.filter((item) => item.status === "new").length },
            { name: "Read", value: allContacts.filter((item) => item.status === "read").length },
            { name: "Replied", value: allContacts.filter((item) => item.status === "replied").length },
        ];

        return res.status(200).json({
            success: true,
            stats: {
                contacts,
                prescriptions,
                appointments,
                users,
            },
            charts: {
                appointments: appointmentChart,
                prescriptions: prescriptionChart,
                users: userChart,
                contacts: contactChart,
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

export const getAdminProfile = async (req, res) => {
    return res.status(200).json({
        success: true,
        admin: buildAdminResponse(req.user),
    });
};

export const getAllAdmins = async (req, res) => {
    try {
        const admins = await User.find({ role: "admin" })
            .select("-password")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            admins: admins.map(buildAdminResponse),
        });
    } catch (error) {
        console.error("Get all admins error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch admin users",
        });
    }
};

export const updateAdminProfile = async (req, res) => {
    try {
        const { name, email, phone } = req.body;

        if (!name || !email || !phone) {
            return res.status(400).json({
                success: false,
                message: "Name, email, and phone are required",
            });
        }

        const existingUser = await User.findOne({
            email,
            _id: { $ne: req.user._id },
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered",
            });
        }

        const adminUser = await User.findByIdAndUpdate(
            req.user._id,
            {
                name: name.trim(),
                email: email.trim().toLowerCase(),
                phone: phone.trim(),
            },
            { new: true, runValidators: true }
        ).select("-password");

        return res.status(200).json({
            success: true,
            message: "Admin profile updated successfully",
            admin: buildAdminResponse(adminUser),
        });
    } catch (error) {
        console.error("Update admin profile error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update admin profile",
        });
    }
};

export const changeAdminPassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Current password and new password are required",
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: "New password must be at least 6 characters",
            });
        }

        const adminUser = await User.findById(req.user._id).select("+password");

        if (!adminUser) {
            return res.status(404).json({
                success: false,
                message: "Admin user not found",
            });
        }

        const isMatch = await adminUser.matchPassword(currentPassword);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Current password is incorrect",
            });
        }

        adminUser.password = newPassword;
        await adminUser.save();

        return res.status(200).json({
            success: true,
            message: "Password updated successfully",
        });
    } catch (error) {
        console.error("Change admin password error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update password",
        });
    }
};

export const createAdminByAdmin = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        if (!name || !email || !phone || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email, phone, and password are required",
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters",
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered",
            });
        }

        const adminUser = await User.create({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            phone: phone.trim(),
            password,
            role: "admin",
        });

        return res.status(201).json({
            success: true,
            message: "New admin created successfully",
            admin: buildAdminResponse(adminUser),
        });
    } catch (error) {
        console.error("Create admin by admin error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create admin user",
        });
    }
};

export const sendAdminCreationOtp = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        if (!name || !email || !phone || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email, phone, and password are required",
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters",
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered",
            });
        }

        const otp = generateOtp();

        await Otp.deleteMany({ email, purpose: "admin-create" });

        await Otp.create({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            phone: phone.trim(),
            password,
            purpose: "admin-create",
            otp,
            expiresAt: Date.now() + 5 * 60 * 1000,
        });

        await sendOtpEmail(email, otp);

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully to the new admin email",
        });
    } catch (error) {
        console.error("Send admin OTP error:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to send OTP for new admin",
        });
    }
};

export const verifyAdminCreationOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Email and OTP are required",
            });
        }

        const otpData = await Otp.findOne({
            email: email.trim().toLowerCase(),
            purpose: "admin-create",
        });

        if (!otpData) {
            return res.status(400).json({
                success: false,
                message: "OTP not found. Please request a new OTP",
            });
        }

        if (otpData.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        if (otpData.expiresAt < Date.now()) {
            await Otp.deleteMany({ email, purpose: "admin-create" });

            return res.status(400).json({
                success: false,
                message: "OTP expired. Please request a new OTP",
            });
        }

        if (!otpData.name || !otpData.phone || !otpData.password) {
            await Otp.deleteMany({ email, purpose: "admin-create" });

            return res.status(400).json({
                success: false,
                message: "Admin registration data missing. Please request a new OTP",
            });
        }

        const existingUser = await User.findOne({ email: otpData.email });

        if (existingUser) {
            await Otp.deleteMany({ email, purpose: "admin-create" });

            return res.status(400).json({
                success: false,
                message: "Email already registered",
            });
        }

        const adminUser = await User.create({
            name: otpData.name,
            email: otpData.email,
            phone: otpData.phone,
            password: otpData.password,
            role: "admin",
        });

        await Otp.deleteMany({ email, purpose: "admin-create" });

        return res.status(201).json({
            success: true,
            message: "New admin created successfully after OTP verification",
            admin: buildAdminResponse(adminUser),
        });
    } catch (error) {
        console.error("Verify admin OTP error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to verify OTP and create admin",
        });
    }
};
