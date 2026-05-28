import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import prescriptionRoutes from "./routes/prescriptionRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";

const app = express();

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

app.get("/", (req, res) => {
    res.send("Dr. APRANA'S Auth API running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/addresses", addressRoutes);

export default app;
