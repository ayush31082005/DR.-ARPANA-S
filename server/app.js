import express from "express";
import cors from "cors";
import path from "path";
import { existsSync } from "fs";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import prescriptionRoutes from "./routes/prescriptionRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.resolve(__dirname, "../client/dist");
const clientIndexPath = path.join(clientDistPath, "index.html");
const hasClientBuild = existsSync(clientIndexPath);

const exactAllowedOrigins = new Set(
    [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        process.env.CLIENT_URL,
    ].filter(Boolean)
);

function isLocalDevOrigin(origin) {
    if (!origin) return false;

    try {
        const parsedUrl = new URL(origin);
        return ["localhost", "127.0.0.1"].includes(parsedUrl.hostname);
    } catch {
        return false;
    }
}

app.use(
    cors({
        origin(origin, callback) {
            if (!origin || exactAllowedOrigins.has(origin) || isLocalDevOrigin(origin)) {
                callback(null, true);
                return;
            }

            callback(new Error("CORS origin not allowed"));
        },
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);

if (hasClientBuild) {
    app.use(express.static(clientDistPath));

    app.get(/^\/(?!api).*/, (req, res) => {
        res.sendFile(clientIndexPath);
    });
} else {
    app.get("/", (req, res) => {
        res.send("Dr. APRANA'S API running...");
    });
}

export default app;
