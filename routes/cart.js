import express from "express";
const validator = require("validator");

import Carts from "../models/cart";

const router = express.Router();
// 7.Thêm vào cart
router.post("", async (req, res) => {
  try {
    const UserId = req.body.UserId;
    const products = req.body.products;

    const productId = products.productId;

    let cart = await Carts.findOne({ UserId: UserId });
    if (cart) {
      let itemIndex = cart.products.findIndex((p) => p.productId === productId);

      if (itemIndex > -1) {
        let productItem = cart.products[itemIndex];
        productItem.quantity += products.quantity;

        cart = await cart.save();
        const data = {
          Status: 200,
          message: "Thêm vào giỏ hàng thành công",
          data1: cart,
        };
        res.status(200).json(data);
      } else {
        cart.products.push(products);
        cart = await cart.save();
        const data = {
          Status: 200,
          message: "Thêm vào giỏ hàng thành công",
          data1: cart,
        };
        res.status(200).json(data);
      }
    } else {
      const newCart = await Carts.create({
        UserId,
        products,
      });
      const data = {
        Status: 200,
        message: "Thêm vào giỏ hàng thành công",
        data1: newCart,
      };
      res.status(200).json(data);
    }
  } catch (err) {
    const data = {
      Status: 500,
      message: "Thêm vào giỏ hàng thất bại",
      data1: {},
    };
    res.status(500).json(data);
  }
});
// 8.Lấy thông tin cart
router.get("/:UserId", async (req, res) => {
  const { UserId } = req.params;
  try {
    const carts = await Carts.findOne({ UserId: UserId });
    if (carts.length > 0) {
      const data = {
        Status: 200,
        message: "Thành Công",
        data1: carts,
      };
      res.status(200).json(data);
    } else {
      const data = {
        Status: 400,
        message: "Không tìm thấy giỏ hàng",
        data1: {},
      };
      res.status(400).json(data);
    }
  } catch (err) {
    const data = {
      Status: 500,
      message: "Thất bại",
      data1: {},
    };
    res.status(500).json(data);
  }
});
// 9.sửa thông tin product
router.put("", async (req, res) => {
  try {
    const { type, UserId, productId } = req.body;
    let cart = await Carts.findOne({ UserId: UserId });
    if (cart) {
      const productItem = await cart.products.findIndex(
        (p) => p.productId === productId
      );
      if (productItem > -1) {
        if (type === "add") {
          let product = cart.products[productItem];
          product.quantity += 1;
          cart = await cart.save();
          const data = {
            Status: 200,
            message: "update giỏ hàng thành công",
            data1: cart,
          };
          res.status(200).json(data);
        }
        if (type === "minus") {
          let product = cart.products[productItem];
          if (product.quantity > 1) {
            product.quantity -= 1;
            cart = await cart.save();
            const data = {
              Status: 200,
              message: "update giỏ hàng thành công",
              data1: cart,
            };
            res.status(200).json(data);
          } else {
            const data = {
              Status: 400,
              message: "update giỏ hàng không thành công thành công",
              data1: {},
            };
            res.status(200).json(data);
          }
        }
      } else {
        const data = {
          Status: 400,
          message: "Thất Bại",
          data1: {},
        };
        res.status(400).json(data);
      }
    } else {
      const data = {
        Status: 500,
        message: "không tìm thấy giỏ hàng",
        data1: {},
      };
      res.status(500).json(data);
    }
  } catch (err) {
    const data = {
      Status: 500,
      message: "update thất bại",
      data1: [],
    };
    res.status(500).json(data);
  }
});
// 10.delete các product trong cart
router.delete("", async (req, res) => {
  try {
    const { dsId, UserId } = req.body;
    const result = await Carts.findOneAndUpdate(
      { UserId: UserId },
      { $pull: { products: { productId: { $in: dsId } } } },
      { multi: true }
    );
    if (result) {
      const data = {
        Status: 200,
        message: "Xóa Thành công",
        data1: result,
      };
      res.status(200).json(data);
    } else {
      const data = {
        Status: 400,
        message: "Xóa Không Thành công",
        data1: {},
      };
      res.status(400).json(data);
    }
  } catch (err) {
    const data = {
      Status: 500,
      message: "Xóa Không Thành công",
      data1: {},
    };
    res.status(500).json(data);
  }
});
module.exports = router;
