import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                },
                name: String,
                image: String,
                price: Number,
                quantity: Number,
            },
        ],

        shippingInfo: {
            fullName: String,
            phone: String,
            email: String,
            address: String,
            city: String,
            state: String,
            pincode: String,
        },

        subtotal: {
            type: Number,
            default: 0,
        },

        shipping: {
            type: Number,
            default: 0,
        },

        tax: {
            type: Number,
            default: 0,
        },

        discount: {
            type: Number,
            default: 0,
        },

        total: {
            type: Number,
            required: true,
        },

        paymentMethod: {
            type: String,
            enum: ["cod", "online"],
            default: "online",
        },

        paymentStatus: {
            type: String,
            enum: ["pending", "paid", "failed"],
            default: "pending",
        },

        orderStatus: {
            type: String,
            enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
            default: "pending",
        },

        razorpayOrderId: String,
        razorpayPaymentId: String,
        razorpaySignature: String,
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
