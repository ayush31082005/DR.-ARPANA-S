import fs from "fs";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const name = file.originalname
            .replace(ext, "")
            .replace(/[^a-zA-Z0-9]/g, "-")
            .toLowerCase();

        cb(null, `${Date.now()}-${name}${ext}`);
    },
});

const fileFilter = (req, file, cb) => {
    const allowed = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/svg+xml",
        "application/pdf",
    ];

    if (allowed.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only JPG, PNG, SVG, PDF allowed"), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

export const uploadPrescriptionFile = (req, res, next) => {
    const handler = upload.single("prescriptionFile");

    handler(req, res, (error) => {
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }

        next();
    });
};

export const uploadProductImage = (req, res, next) => {
    const handler = upload.single("productImage");

    handler(req, res, (error) => {
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }

        next();
    });
};

export default upload;
