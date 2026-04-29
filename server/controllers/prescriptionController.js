import Prescription from "../models/Prescription.js";
import cloudinary, {
    configureCloudinary,
    getMissingCloudinaryEnvVars,
    isCloudinaryConfigured,
} from "../config/cloudinary.js";
import fs from "fs";

export const createPrescription = async (req, res) => {
    let uploadedLocalFilePath = "";

    try {
        const { fullName, mobileNumber, email, daysRequired, address } = req.body;

        if (!fullName || !mobileNumber || !email || !daysRequired || !address) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Prescription file is required",
            });
        }

        const file = req.file;
        uploadedLocalFilePath = file.path;

        if (!isCloudinaryConfigured()) {
            return res.status(503).json({
                success: false,
                message: "Cloudinary is not configured properly",
                missingEnvVars: getMissingCloudinaryEnvVars(),
            });
        }

        configureCloudinary();

        const uploadedFile = await cloudinary.uploader.upload(file.path, {
            folder: "prescriptions",
            resource_type: "auto",
        });

        const prescription = await Prescription.create({
            fullName,
            mobileNumber,
            email,
            daysRequired,
            address,
            originalFileName: file.originalname,
            prescriptionFile: {
                url: uploadedFile.secure_url,
                publicId: uploadedFile.public_id,
                fileType: file.mimetype,
            },
        });

        res.status(201).json({
            success: true,
            message: "Prescription submitted successfully",
            prescription,
        });
    } catch (error) {
        console.error("Create Prescription Error:", error);
        res.status(500).json({
            success: false,
            message: "Server error while submitting prescription",
            error: error.message,
        });
    } finally {
        if (uploadedLocalFilePath && fs.existsSync(uploadedLocalFilePath)) {
            fs.unlinkSync(uploadedLocalFilePath);
        }
    }
};

export const getPrescriptionUploadStatus = async (req, res) => {
    return res.status(200).json({
        success: true,
        uploadFieldName: "prescriptionFile",
        acceptedFileTypes: ["image/jpeg", "image/jpg", "image/png", "application/pdf"],
        maxFileSizeMb: 5,
        cloudinaryConfigured: isCloudinaryConfigured(),
        missingEnvVars: getMissingCloudinaryEnvVars(),
    });
};

export const getAllPrescriptions = async (req, res) => {
    try {
        const filter = {};

        if (req.query.email) {
            filter.email = req.query.email;
        }

        const prescriptions = await Prescription.find(filter).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            prescriptions,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch prescriptions",
        });
    }
};

export const getSinglePrescription = async (req, res) => {
    try {
        const prescription = await Prescription.findById(req.params.id);

        if (!prescription) {
            return res.status(404).json({
                success: false,
                message: "Prescription not found",
            });
        }

        res.status(200).json({
            success: true,
            prescription,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch prescription",
        });
    }
};

export const updatePrescriptionStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!["pending", "approved", "rejected"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status",
            });
        }

        const prescription = await Prescription.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!prescription) {
            return res.status(404).json({
                success: false,
                message: "Prescription not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Prescription status updated",
            prescription,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update status",
        });
    }
};
