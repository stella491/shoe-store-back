import "dotenv/config";
import mongoose from "mongoose";
import Product from "../models/Product.js";
import dns from "dns";
import type { IProduct } from "../types/models.js";

const products: IProduct[] = [
  {
    name: "Air Max 270",
    brand: "Nike",
    category: "men",
    price: 150,
    description:
      "Lightweight running shoes with maximum cushioning for all-day comfort.",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  {
    name: "Ultraboost 22",
    brand: "Adidas",
    category: "men",
    price: 180,
    description: "High-performance sneakers with responsive Boost cushioning.",
    images: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  {
    name: "RS-Dreamer",
    brand: "Puma",
    category: "men",
    price: 140,
    description: "Lifestyle sneakers designed for comfort and street style.",
    images: [
      "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1588361861040-ac9b1018f6d5?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  {
    name: "Orange Sneakers",
    brand: "Anony",
    category: "women",
    price: 240,
    description: "Casual sneakers designed for comfort and street style.",
    images: [
      "https://images.unsplash.com/photo-1520256862855-398228c41684?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  {
    name: "Nike Air Force 1",
    brand: "Nike",
    category: "men",
    price: 120,
    description:
      "Classic basketball sneaker with durable leather and iconic style.",
    images: [
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  {
    name: "Yeezy Boost 350",
    brand: "Adidas",
    category: "men",
    price: 220,
    description:
      "Primeknit sneakers with Boost cushioning and modern street style.",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  {
    name: "Air Jordan 1",
    brand: "Nike",
    category: "men",
    price: 200,
    description: "Legendary basketball sneaker first worn by Michael Jordan.",
    images: [
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1588361861040-ac9b1018f6d5?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  {
    name: "New Balance 574",
    brand: "New Balance",
    category: "men",
    price: 110,
    description: "Retro running shoes combining style and comfort.",
    images: [
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1588361861040-ac9b1018f6d5?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  {
    name: "ASICS Gel Kayano",
    brand: "ASICS",
    category: "men",
    price: 190,
    description:
      "Premium running shoe designed for stability and long-distance comfort.",
    images: [
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  {
    name: "Converse Chuck Taylor",
    brand: "Converse",
    category: "men",
    price: 75,
    description: "Timeless canvas sneakers known for their minimalist design.",
    images: [
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520256862855-398228c41684?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  {
    name: "Reebok Classic Leather",
    brand: "Reebok",
    category: "women",
    price: 95,
    description: "Minimalist leather sneaker designed for everyday wear.",
    images: [
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  {
    name: "Nike Vaporfly",
    brand: "Nike",
    category: "men",
    price: 250,
    description: "Elite marathon racing shoe engineered for speed.",
    images: [
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  {
    name: "Nike Dunk Low",
    brand: "Nike",
    category: "women",
    price: 130,
    description: "Basketball heritage sneakers with a modern lifestyle appeal.",
    images: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520256862855-398228c41684?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  {
    name: "Adidas NMD R1",
    brand: "Adidas",
    category: "men",
    price: 150,
    description:
      "Modern streetwear sneaker inspired by Adidas running heritage.",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  {
    name: "Puma Suede Classic",
    brand: "Puma",
    category: "men",
    price: 85,
    description: "Streetwear staple with premium suede construction.",
    images: [
      "https://images.unsplash.com/photo-1588361861040-ac9b1018f6d5?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  {
    name: "Nike Pegasus 40",
    brand: "Nike",
    category: "men",
    price: 130,
    description: "Reliable daily running shoes with balanced cushioning.",
    images: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  {
    name: "Adidas Gazelle",
    brand: "Adidas",
    category: "women",
    price: 95,
    description: "Classic suede sneakers with minimalist design.",
    images: [
      "https://images.unsplash.com/photo-1520256862855-398228c41684?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  {
    name: "Nike Blazer Mid",
    brand: "Nike",
    category: "women",
    price: 105,
    description: "Vintage basketball sneakers turned streetwear icon.",
    images: [
      "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520256862855-398228c41684?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  {
    name: "Under Armour HOVR Phantom",
    brand: "Under Armour",
    category: "men",
    price: 140,
    description: "Performance sneakers with responsive cushioning.",
    images: [
      "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=1200&auto=format&fit=crop",
    ],
  },

  {
    name: "Nike React Infinity Run",
    brand: "Nike",
    category: "women",
    price: 160,
    description: "Running shoe designed for comfort and injury reduction.",
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520256862855-398228c41684?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1200&auto=format&fit=crop",
    ],
  },
];

export default products;

async function seed() {
  try {
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
    console.log("Overrode Node DNS servers");
  } catch (e) {
    console.log("Could not set DNS servers");
  }

  try {
    const mongouri = process.env.MONGO_URI;
    if (!mongouri) {
      throw new Error("Missing required environment variable: MONGO_URI");
    }
    console.log("Connecting to mongodb");
    await mongoose.connect(mongouri);
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Seeded", products.length, "products");
  } catch (err) {
    console.log("Seeding failed");
  } finally {
    try {
      await mongoose.disconnect();
    } catch (e) {}
  }
}

seed();
