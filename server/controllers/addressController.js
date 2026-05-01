import User from "../models/User.js";

const requiredFields = [
    "fullName",
    "phone",
    "address",
    "city",
    "state",
    "pincode",
];

const pickAddressPayload = (body = {}) => ({
    fullName: body.fullName?.trim() || "",
    phone: body.phone?.trim() || "",
    address: body.address?.trim() || "",
    city: body.city?.trim() || "",
    state: body.state?.trim() || "",
    pincode: body.pincode?.trim() || "",
});

const getMissingField = (address) =>
    requiredFields.find((field) => !address[field]);

export const getMyAddresses = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("addresses");

        return res.status(200).json({
            success: true,
            count: user?.addresses?.length || 0,
            addresses: user?.addresses || [],
        });
    } catch (error) {
        console.error("Get My Addresses Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch addresses",
        });
    }
};

export const addMyAddress = async (req, res) => {
    try {
        const nextAddress = pickAddressPayload(req.body);
        const missingField = getMissingField(nextAddress);

        if (missingField) {
            return res.status(400).json({
                success: false,
                message: `${missingField} is required`,
            });
        }

        const user = await User.findById(req.user._id);
        user.addresses.unshift(nextAddress);
        await user.save();

        return res.status(201).json({
            success: true,
            message: "Address added successfully",
            address: user.addresses[0],
            addresses: user.addresses,
        });
    } catch (error) {
        console.error("Add Address Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to add address",
        });
    }
};

export const updateMyAddress = async (req, res) => {
    try {
        const updatedFields = pickAddressPayload(req.body);
        const missingField = getMissingField(updatedFields);

        if (missingField) {
            return res.status(400).json({
                success: false,
                message: `${missingField} is required`,
            });
        }

        const user = await User.findById(req.user._id);
        const address = user.addresses.id(req.params.addressId);

        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found",
            });
        }

        Object.assign(address, updatedFields);
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Address updated successfully",
            address,
            addresses: user.addresses,
        });
    } catch (error) {
        console.error("Update Address Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update address",
        });
    }
};
