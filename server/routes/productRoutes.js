import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/productController.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";
import { uploadProductImage } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", getAllProducts);
router.post("/", protect, authorizeRoles("admin"), uploadProductImage, createProduct);
router.put("/:id", protect, authorizeRoles("admin"), uploadProductImage, updateProduct);
router.delete("/:id", protect, authorizeRoles("admin"), deleteProduct);

export default router;
