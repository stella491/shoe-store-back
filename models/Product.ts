import mongoose from "mongoose";
import type { IProduct } from "../types/models.js";

const productSchema = new mongoose.Schema<IProduct>({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true, enum: ["men", "women"] },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  images: [{ type: String, required: true }],
});

export default mongoose.model<IProduct>("Product", productSchema);
