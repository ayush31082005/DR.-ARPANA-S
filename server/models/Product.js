import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        originalPrice: {
            type: Number,
            required: true,
            min: 0,
        },
        discountPercent: {
            type: Number,
            required: true,
            min: 0,
            max: 100,
            default: 0,
        },
        finalPrice: {
            type: Number,
            required: true,
            min: 0,
        },
        stock: {
            type: Number,
            required: true,
            min: 0,
        },
        quantityLabel: {
            type: String,
            trim: true,
            default: "",
        },
        shortDetails: {
            type: String,
            trim: true,
            default: "",
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: String,
            required: true,
            trim: true,
        },
        imagePublicId: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Product", productSchema);
