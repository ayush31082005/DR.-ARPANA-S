import { v2 as cloudinary } from "cloudinary";

const placeholderValues = new Set([
    "your_cloud_name",
    "your_api_key",
    "your_api_secret",
]);

const getCloudinaryEnv = () => ({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const configureCloudinary = () => {
    const cloudinaryEnv = getCloudinaryEnv();
    cloudinary.config(cloudinaryEnv);
    return cloudinaryEnv;
};

export const getMissingCloudinaryEnvVars = () => {
    const cloudinaryEnv = getCloudinaryEnv();
    const missing = [];

    if (!cloudinaryEnv.cloud_name || placeholderValues.has(cloudinaryEnv.cloud_name)) {
        missing.push("CLOUDINARY_CLOUD_NAME");
    }

    if (!cloudinaryEnv.api_key || placeholderValues.has(cloudinaryEnv.api_key)) {
        missing.push("CLOUDINARY_API_KEY");
    }

    if (!cloudinaryEnv.api_secret || placeholderValues.has(cloudinaryEnv.api_secret)) {
        missing.push("CLOUDINARY_API_SECRET");
    }

    return missing;
};

export const isCloudinaryConfigured = () =>
    getMissingCloudinaryEnvVars().length === 0;

configureCloudinary();

export default cloudinary;
