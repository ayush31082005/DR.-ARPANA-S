import Order from "../models/Order.js";

export const createCashOnDeliveryOrder = async (req, res) => {
    try {
        const {
            items,
            shippingInfo,
            subtotal = 0,
            shipping = 0,
            tax = 0,
            discount = 0,
            total,
        } = req.body;

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "At least one order item is required",
            });
        }

        if (!shippingInfo) {
            return res.status(400).json({
                success: false,
                message: "Shipping information is required",
            });
        }

        const requiredShippingFields = [
            "fullName",
            "phone",
            "address",
            "city",
            "state",
            "pincode",
        ];

        const missingShippingField = requiredShippingFields.find(
            (field) => !shippingInfo[field]
        );

        if (missingShippingField) {
            return res.status(400).json({
                success: false,
                message: `${missingShippingField} is required in shipping info`,
            });
        }

        if (!total || Number(total) <= 0) {
            return res.status(400).json({
                success: false,
                message: "Valid total amount is required",
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
            paymentMethod: "cod",
            paymentStatus: "pending",
            orderStatus: "pending",
        });

        return res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order,
        });
    } catch (error) {
        console.error("Create COD Order Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create order",
        });
    }
};

export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({
            createdAt: -1,
        });

        return res.status(200).json({
            success: true,
            count: orders.length,
            orders,
        });
    } catch (error) {
        console.error("Get My Orders Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch orders",
        });
    }
};

export const getSingleMyOrder = async (req, res) => {
    try {
        const order = await Order.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        return res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        console.error("Get Single Order Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch order",
        });
    }
};
