import type { Request, Response } from "express";
import Product from "../models/Product.js";
import { getErrorMessage } from "../utils/errors.js";

interface CreateProductBody {
  name?: unknown;
  brand?: unknown;
  category?: unknown;
  price?: unknown;
  description?: unknown;
  images?: unknown;
}

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: getErrorMessage(error) });
  }
};

export const createProduct = async (
  req: Request<{}, {}, CreateProductBody>,
  res: Response,
) => {
  try {
    const { name, brand, category, price, description, images } = req.body;

    const cleanImages = Array.isArray(images)
      ? images.map((url) => String(url).trim()).filter(Boolean)
      : [];

    const errors: string[] = [];

    const nameStr = typeof name === "string" ? name : "";
    const brandStr = typeof brand === "string" ? brand : "";
    const descriptionStr = typeof description === "string" ? description : "";
    const validCategory: "men" | "women" | null =
      category === "men" || category === "women" ? category : null;

    if (!nameStr.trim()) errors.push("Name is required");
    if (!brandStr.trim()) errors.push("Brand is required");
    if (!descriptionStr.trim()) errors.push("Description is required");
    if (!validCategory) errors.push("Category must be men or women");
    if (!cleanImages.length) errors.push("At least one image URL is required");

    const numericPrice = Number(price);
    if (!price || Number.isNaN(numericPrice) || numericPrice <= 0) {
      errors.push("Price must be a number greater than 0");
    }

    if (errors.length) {
      return res.status(400).json({ message: errors.join(". ") });
    }

    if (!validCategory) {
      return res.status(400).json({ message: "Category must be men or women" });
    }

    const product = await Product.create({
      name: nameStr.trim(),
      brand: brandStr.trim(),
      category: validCategory,
      price: numericPrice,
      description: descriptionStr.trim(),
      images: cleanImages,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: getErrorMessage(error) });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productID = req.params.id;
    const product = await Product.findByIdAndDelete(productID);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted", _id: product._id });
  } catch (error) {
    res.status(500).json({ message: getErrorMessage(error) });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const productID = req.params.id;
    const product = await Product.findById(productID);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: getErrorMessage(error) });
  }
};
