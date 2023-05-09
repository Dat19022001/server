import mongoose from "mongoose";

const Order = new mongoose.Schema(
  {
    userId: { type: String, require: true },
    phone: { type: String, require: true },
    address: { type: String, require: true },
    products: [
      {
        productId: { type: String, require: true },
        productName: { type: String, require: true },
        productImg: { type: String, require: true },
        productPrice: { type: Number, require: true, integer: true },
        quantity: { type: Number, require: true, integer: true },
        des: { type: String, require: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", Order);
