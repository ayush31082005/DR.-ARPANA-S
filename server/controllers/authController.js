import User from "../models/User.js";
import Otp from "../models/Otp.js";
import generateOtp from "../utils/generateOtp.js";
import generateToken from "../utils/generateToken.js";
import { sendOtpEmail } from "../utils/Email.js";

export const sendRegisterOtp = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        if (!name || !email || !phone || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters",
            });
        }

        const existingEmail = await User.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({
                success: false,
                message: "Email already registered",
            });
        }

        const existingPhone = await User.findOne({ phone });

        if (existingPhone) {
            return res.status(400).json({
                success: false,
                message: "Phone number already registered",
            });
        }

        const otp = generateOtp();

        await Otp.deleteMany({ email, purpose: "register" });

        await Otp.create({
            name,
            email,
            phone,
            password,
            purpose: "register",
            otp,
            expiresAt: Date.now() + 5 * 60 * 1000,
        });

        await sendOtpEmail(email, otp);

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully to your email",
        });
    } catch (error) {
        console.error("Send OTP Error:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Server error while sending OTP",
        });
    }
};

export const verifyOtpAndRegister = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Email and OTP are required",
            });
        }

        const otpData = await Otp.findOne({ email, purpose: "register" });

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
            await Otp.deleteMany({ email, purpose: "register" });

            return res.status(400).json({
                success: false,
                message: "OTP expired. Please request a new OTP",
            });
        }

        if (!otpData.name || !otpData.phone || !otpData.password) {
            await Otp.deleteMany({ email, purpose: "register" });

            return res.status(400).json({
                success: false,
                message: "Registration data missing. Please request a new OTP",
            });
        }

        const existingUser = await User.findOne({
            $or: [{ email: otpData.email }, { phone: otpData.phone }],
        });

        if (existingUser) {
            await Otp.deleteMany({ email, purpose: "register" });

            return res.status(400).json({
                success: false,
                message: "User already registered",
            });
        }

        const user = await User.create({
            name: otpData.name,
            email: otpData.email,
            phone: otpData.phone,
            password: otpData.password,
        });

        await Otp.deleteMany({ email, purpose: "register" });

        const token = generateToken(user._id);

        return res.status(201).json({
            success: true,
            message: "Registration successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
            },
        });
    } catch (error) {
        console.error("Verify OTP Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while verifying OTP",
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const token = generateToken(user._id);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
            },
        });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while login",
        });
    }
};

// FORGOT PASSWORD - SEND OTP
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const otp = generateOtp();

        // old OTP delete
        await Otp.deleteMany({ email, purpose: "reset-password" });

        await Otp.create({
            email: user.email,
            purpose: "reset-password",
            isVerified: false,
            otp,
            expiresAt: Date.now() + 5 * 60 * 1000,
        });

        await sendOtpEmail(email, otp);

        return res.status(200).json({
            success: true,
            message: "OTP sent to your email",
        });
    } catch (error) {
        console.error("Forgot Password Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

export const verifyResetOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Email and OTP are required",
            });
        }

        const otpData = await Otp.findOne({ email, purpose: "reset-password" });

        if (!otpData) {
            return res.status(400).json({
                success: false,
                message: "OTP not found. Please request a new OTP",
            });
        }

        if (otpData.expiresAt < Date.now()) {
            await Otp.deleteMany({ email, purpose: "reset-password" });

            return res.status(400).json({
                success: false,
                message: "OTP expired. Please request a new OTP",
            });
        }

        if (otpData.otp !== otp) {
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
        console.error("Verify Reset OTP Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while verifying OTP",
        });
    }
};


// RESET PASSWORD
export const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        if (!email || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Email and new password are required",
            });
        }

        const otpData = await Otp.findOne({ email, purpose: "reset-password" });

        if (!otpData) {
            return res.status(400).json({
                success: false,
                message: "OTP not found",
            });
        }

        if (otpData.expiresAt < Date.now()) {
            await Otp.deleteMany({ email, purpose: "reset-password" });

            return res.status(400).json({
                success: false,
                message: "OTP expired",
            });
        }

        if (!otpData.isVerified) {
            return res.status(400).json({
                success: false,
                message: "Please verify OTP first",
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters",
            });
        }

        // Update password
        const user = await User.findOne({ email });

        if (!user) {
            await Otp.deleteMany({ email, purpose: "reset-password" });

            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        user.password = newPassword;
        await user.save(); // pre-save hash trigger

        await Otp.deleteMany({ email, purpose: "reset-password" });

        return res.status(200).json({
            success: true,
            message: "Password reset successful",
        });
    } catch (error) {
        console.error("Reset Password Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};



export const getMe = async (req, res) => {
    return res.status(200).json({
        success: true,
        user: req.user,
    });
};
