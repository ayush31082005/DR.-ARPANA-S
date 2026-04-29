import nodemailer from "nodemailer";

export const sendOtpEmail = async (email, otp) => {
    try {
        console.log(`OTP for ${email}: ${otp}`);

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "OTP Verification",
            html: `<h2>Your OTP: ${otp}</h2>`,
        });

    } catch (error) {
        console.error("Email Send Error:", error);
        throw new Error("Failed to send OTP email");
    }
};
