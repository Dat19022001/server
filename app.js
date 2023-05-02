import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import productRoutes from "./routes/products";
import cartRoutes from "./routes/cart";
import categoryRoutes from "./routes/category";

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("BD connection successfully"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/product", productRoutes);
app.use("/cart", cartRoutes);
app.use("/category", categoryRoutes);

app.listen(port, () => {
  console.log("Server is running");
});
