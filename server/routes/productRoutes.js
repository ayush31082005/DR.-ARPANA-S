import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/productController.js";
import { uploadProductImage } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", getAllProducts);
router.post("/", uploadProductImage, createProduct);
router.put("/:id", uploadProductImage, updateProduct);
router.delete("/:id", deleteProduct);

export default router;
