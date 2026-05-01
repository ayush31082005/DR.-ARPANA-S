import express from "express";
import {
    addMyAddress,
    getMyAddresses,
    updateMyAddress,
} from "../controllers/addressController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getMyAddresses);
router.post("/", addMyAddress);
router.put("/:addressId", updateMyAddress);

export default router;
