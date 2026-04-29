import crypto from "crypto";
import razorpay from "../config/razorpay.js";
import Order from "../models/Order.js";

export const createRazorpayOrder = async (req, res) => {
    try {
        const { amount } = req.body;

        if (!razorpay) {
            return res.status(503).json({
                success: false,
                message: "Razorpay is not configured",
            });
        }

        if (!amount || Number(amount) <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid amount",
            });
        }

        const options = {
            amount: Math.round(Number(amount) * 100),
            currency: "INR",
            receipt: `order_rcpt_${Date.now()}`,
        };

        const razorpayOrder = await razorpay.orders.create(options);

        return res.status(200).json({
            success: true,
            key: process.env.RAZORPAY_KEY_ID,
            orderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
        });
    } catch (error) {
        console.error("Create Razorpay Order Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create Razorpay order",
        });
    }
};

export const verifyPaymentAndCreateOrder = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            items,
            shippingInfo,
            subtotal,
            shipping,
            tax,
            discount,
            total,
        } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Payment details missing",
            });
        }

        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Invalid payment signature",
            });
        }

        const order = await Order.create({
            user: req.user._id,
            items,
            shippingInfo,
            subtotal,
            shipping,
            tax,
            discount,
            total,
            paymentMethod: "online",
            paymentStatus: "paid",
            orderStatus: "processing",
            razorpayOrderId: razorpay_order_id,
            razorpayPaymentId: razorpay_payment_id,
            razorpaySignature: razorpay_signature,
        });

        return res.status(201).json({
            success: true,
            message: "Payment verified and order created successfully",
            order,
        });
    } catch (error) {
        console.error("Verify Payment Error:", error);
        return res.status(500).json({
            success: false,
            message: "Payment verification failed",
        });
    }
};
