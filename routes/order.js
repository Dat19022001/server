import express from "express";
import dotenv from "dotenv";

import Order from "../models/order";
import Carts from "../models/cart";

dotenv.config();

const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("", async (req, res) => {
  const userId = req.body.userId;
  const address = req.body.address;
  const phone = req.body.phone;
  const products = req.body.products;

  let dsId = [];
  for (let i = 0; i < products.length; i++) {
    dsId.push(products[i].productId);
  }
  const result = await Carts.findOneAndUpdate(
    { UserId: userId },
    { $pull: { products: { productId: { $in: dsId } } } },
    { multi: true }
  );
  const newOrder = new Order({
    userId: userId,
    address: address,
    phone: phone,
    products: products,
  });

  try {
    const customer = await stripe.customers.create({
      metadata: {
        userId: userId,
        // order : saveOrder._id.toString(),
      },
    });

    const line_items = products.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.productName,
            images: [item.productImg],
            description: item.des,
            metadata: {
              id: item.productId,
            },
          },
          unit_amount: item.productPrice * 100,
        },
        quantity: item.quantity,
      };
    });
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      customer: customer.id,
      success_url: "https://www.instagram.com/reels/Cr__DBVMUam/",
      cancel_url: "https://www.instagram.com/reels/Cr__DBVMUam/",
    });
    const saveOrder = await newOrder.save();
    const data = {
      Status: 200,
      message: "Order thanh cong",
      data1: saveOrder,
      link: session.url,
    };
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    const data = {
      Status: 500,
      message: "Thêm order thất bại",
      data1: {},
      link: "",
    };
    res.status(500).json(data);
  }
});

module.exports = router;
