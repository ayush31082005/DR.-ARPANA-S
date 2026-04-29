import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        mobileNumber: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        daysRequired: {
            type: Number,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        prescriptionFile: {
            url: {
                type: String,
                required: true,
            },
            publicId: {
                type: String,
                required: true,
            },
            fileType: {
                type: String,
            },
        },
        originalFileName: {
            type: String,
            trim: true,
        },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },
    },
    { timestamps: true }
);

export default mongoose.model("Prescription", prescriptionSchema);
