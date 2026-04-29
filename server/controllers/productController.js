import fs from "fs";
import Product from "../models/Product.js";
import cloudinary, { configureCloudinary } from "../config/cloudinary.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            products,
        });
    } catch (error) {
        console.error("Get products error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch products",
        });
    }
};

export const createProduct = async (req, res) => {
    let uploadedLocalFilePath = "";

    try {
        const {
            name,
            price: rawPrice,
            category,
            discountPercent: rawDiscountPercent = 0,
            stock,
            quantityLabel = "",
            shortDetails = "",
            description,
        } = req.body;

        if (!name || !rawPrice || !category || stock === undefined || !description) {
            return res.status(400).json({
                success: false,
                message: "All product fields are required",
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Product image is required",
            });
        }

        const originalPrice = Number(rawPrice);
        const discountPercent = Number(rawDiscountPercent || 0);
        const finalPrice = Number(
            (originalPrice - (originalPrice * discountPercent) / 100).toFixed(2)
        );

        if (Number.isNaN(originalPrice) || originalPrice <= 0) {
            return res.status(400).json({
                success: false,
                message: "Valid price is required",
            });
        }

        if (Number.isNaN(discountPercent) || discountPercent < 0 || discountPercent > 100) {
            return res.status(400).json({
                success: false,
                message: "Discount percent must be between 0 and 100",
            });
        }

        configureCloudinary();

        uploadedLocalFilePath = req.file.path;
        const uploadedImage = await cloudinary.uploader.upload(uploadedLocalFilePath, {
            folder: "products",
            resource_type: "image",
        });

        const product = await Product.create({
            name,
            category,
            originalPrice,
            discountPercent,
            finalPrice,
            stock: Number(stock),
            quantityLabel: quantityLabel.trim(),
            shortDetails: shortDetails.trim(),
            description,
            image: uploadedImage.secure_url,
            imagePublicId: uploadedImage.public_id,
        });

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            product,
        });
    } catch (error) {
        console.error("Create product error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create product",
        });
    } finally {
        if (uploadedLocalFilePath && fs.existsSync(uploadedLocalFilePath)) {
            fs.unlinkSync(uploadedLocalFilePath);
        }
    }
};

export const updateProduct = async (req, res) => {
    let uploadedLocalFilePath = "";

    try {
        const { id } = req.params;
        const {
            name,
            price: rawPrice,
            category,
            discountPercent: rawDiscountPercent = 0,
            stock,
            quantityLabel = "",
            shortDetails = "",
            description,
        } = req.body;

        if (!name || !rawPrice || !category || stock === undefined || !description) {
            return res.status(400).json({
                success: false,
                message: "All product fields are required",
            });
        }

        const existingProduct = await Product.findById(id);

        if (!existingProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        const originalPrice = Number(rawPrice);
        const discountPercent = Number(rawDiscountPercent || 0);
        const finalPrice = Number(
            (originalPrice - (originalPrice * discountPercent) / 100).toFixed(2)
        );

        if (Number.isNaN(originalPrice) || originalPrice <= 0) {
            return res.status(400).json({
                success: false,
                message: "Valid price is required",
            });
        }

        if (Number.isNaN(discountPercent) || discountPercent < 0 || discountPercent > 100) {
            return res.status(400).json({
                success: false,
                message: "Discount percent must be between 0 and 100",
            });
        }

        const updates = {
            name,
            category,
            originalPrice,
            discountPercent,
            finalPrice,
            stock: Number(stock),
            quantityLabel: quantityLabel.trim(),
            shortDetails: shortDetails.trim(),
            description,
        };

        if (req.file) {
            configureCloudinary();
            uploadedLocalFilePath = req.file.path;

            const uploadedImage = await cloudinary.uploader.upload(uploadedLocalFilePath, {
                folder: "products",
                resource_type: "image",
            });

            if (existingProduct.imagePublicId) {
                await cloudinary.uploader.destroy(existingProduct.imagePublicId).catch(() => null);
            }

            updates.image = uploadedImage.secure_url;
            updates.imagePublicId = uploadedImage.public_id;
        }

        const product = await Product.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        });

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product,
        });
    } catch (error) {
        console.error("Update product error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update product",
        });
    } finally {
        if (uploadedLocalFilePath && fs.existsSync(uploadedLocalFilePath)) {
            fs.unlinkSync(uploadedLocalFilePath);
        }
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const existingProduct = await Product.findById(id);

        if (!existingProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        if (existingProduct.imagePublicId) {
            configureCloudinary();
            await cloudinary.uploader.destroy(existingProduct.imagePublicId).catch(() => null);
        }

        await Product.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        console.error("Delete product error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete product",
        });
    }
};
