import mongoose from "mongoose";
import User from "../models/User.js";

const ensurePhoneIndexAllowsDuplicates = async () => {
    try {
        const indexes = await User.collection.indexes();
        const phoneIndex = indexes.find((index) => index.name === "phone_1" && index.unique);

        if (phoneIndex) {
            await User.collection.dropIndex("phone_1");
            console.log("Dropped unique index on users.phone");
        }
    } catch (error) {
        console.error("User phone index sync warning:", error.message);
    }
};

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        await ensurePhoneIndexAllowsDuplicates();
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("MongoDB Error:", error.message);
        process.exit(1);
    }
};

export default connectDB;
