import "dotenv/config";
import { env } from "./config/env.js";
import cors from "cors";
import mongoose from "mongoose";
import dns from "dns";
import express from "express";
import authRoute from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import { getErrorMessage } from "./utils/errors.js";

try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
  console.log("Overrode Node DNS servers");
} catch (e) {
  console.log("Could not set DNS servers");
}

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/products", productRoutes);

const PORT = env.PORT;
const mongouri = env.MONGO_URI;

mongoose
  .connect(mongouri)
  .then(() => {
    console.log("database connected");
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", getErrorMessage(error));
    process.exit(1);
  });
