import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
} from "../Controller/productController.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = Router();

router.get("/", getAllProducts);

router.post("/", requireAuth, requireAdmin, createProduct);

router.delete("/:id", requireAuth, requireAdmin, deleteProduct);

router.get("/:id", getProductById);

export default router;
