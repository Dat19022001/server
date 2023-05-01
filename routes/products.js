import express from "express";
const validator = require("validator");
import Products from "../models/products";

const router = express.Router();
// 1.thêm sản phẩm
router.post("", async (req, res) => {
  const newProduct = new Products({
    id: req.body.id,
    name: req.body.name,
    author: req.body.author,
    imgUrl: req.body.imgUrl,
    datePublish: req.body.datePublish,
    description: req.body.description,
    pageNumber: req.body.pageNumber,
    cat: req.body.cat,
    buyNumber: req.body.buyNumber,
    price: req.body.price,
    rate: req.body.rate,
    comment: req.body.comment,
  });
  try {
    if (
      !validator.isEmpty(newProduct.id) &&
      !validator.isEmpty(newProduct.name) &&
      !validator.isEmpty(newProduct.author) &&
      !validator.isEmpty(newProduct.imgUrl) &&
      !validator.isEmpty(newProduct.datePublish) &&
      !validator.isEmpty(newProduct.description) &&
      !isNaN(newProduct.pageNumber) &&
      !isNaN(newProduct.buyNumber) &&
      !isNaN(newProduct.rate) &&
      !isNaN(newProduct.price)
    ) {
      const saveProduct = await newProduct.save();
      const data = {
        Status: 200,
        message: "Thêm Sản Phẩm Thành Công",
        data1: saveProduct,
      };
      res.status(200).json(data);
    } else {
      const data = {
        Status: 400,
        message: "Thêm Thất bại",
        data1: [],
      };
      res.status(500).json(data);
    }
  } catch (err) {
    const data = {
      Status: 500,
      message: "Thêm sản phẩm thất bại",
      data1: [],
    };
    res.status(500).json(data);
  }
});
// 2.lấy tất cả các sản phẩm
router.get("", async (req, res) => {
  try {
    const products = await Products.find();
    if (products.length > 0) {
      const data = {
        Status: 200,
        message: "Successfully",
        data1: products,
      };
      res.status(200).json(data);
    } else {
      const data = {
        Status: 400,
        message: "Không có sản phẩm",
        data1: [],
      };
      res.status(400).json(data);
    }
  } catch (err) {
    const data = {
      Status: 500,
      message: "Không tìm thấy sản phẩm",
      data1: [],
    };
    res.status(500).json(data);
  }
});
// 3.Xóa sản phẩm theo id
router.delete("", async (req, res) => {
  const { id } = req.query;
  try {
    const deletedProduct = await Products.findOneAndDelete({ id: id });
    if (deletedProduct) {
      const data = {
        Status: 200,
        message: "Xóa Sản Phẩm Thành Công",
      };
      res.status(200).json(data);
    } else {
      const data = {
        Status: 400,
        message: "Xóa Sản Phẩm Không Thành Công",
      };
      res.status(400).json(data);
    }
  } catch (err) {
    const data = {
      Status: 500,
      message: "Xóa Sản Phẩm Không Thành Công",
    };
    res.status(500).json(data);
  }
});
// 4.sửa thông tin các sản phẩm
router.put("", async (req, res) => {
  try {
    const updatedProduct = await Products.findOneAndUpdate(
      { id: req.body.id },
      req.body,
      { new: true }
    );
    if (updatedProduct) {
      const data = {
        Status: 200,
        message: "Update thành Công",
        data1: updatedProduct,
      };
      res.status(200).json(data);
    } else {
      const data = {
        Status: 400,
        message: "Update Thất Bại",
        data1: [],
      };
      res.status(400).json(data);
    }
  } catch (error) {
    const data = {
      Status: 500,
      message: "Update Thất Bại",
      data1: [],
    };
    res.status(500).json(data);
  }
});
// 5.thêm comment vào các sản phẩm
router.put("/comment", async (req, res) => {
  const newComment = req.body.comment;
  try {
    if (
      !validator.isEmpty(newComment.UserId) &&
      !validator.isEmpty(newComment.content) &&
      !validator.isEmpty(newComment.date)
    ) {
      const updatedComment = await Products.findOneAndUpdate(
        { id: req.body.id },
        { $push: { comment: newComment } },
        { new: true }
      );
      if (updatedComment) {
        const data = {
          Status: 200,
          message: "Update thành Công",
          data1: updatedComment,
        };
        res.status(200).json(data);
      } else {
        const data = {
          Status: 400,
          message: "Update Thất Bại",
        };
        res.status(400).json(data);
      }
    } else {
      const data = {
        Status: 400,
        message: "update thất bại",
      };
      res.status(400).json(data);
    }
  } catch (err) {
    const data = {
      Status: 500,
      message: "update thất bại",
    };
    res.status(500).json(data);
  }
});
// 6.xóa comment của các sản phẩm
router.delete("/:productId/comment/:commentId", async (req, res) => {
  const { productId, commentId } = req.params;
  try {
    const commentProduct = await Products.findOneAndUpdate(
      { id: productId },
      { $pull: { comment: { _id: commentId } } },
      { new: true }
    );
    if (commentProduct) {
      const data = {
        Status: 200,
        message: "Xóa comment thành công",
        data1: commentProduct,
      };
      res.status(200).json(data);
    } else {
      const data = {
        Status: 400,
        message: "Xóa comment thất bại",
      };
      res.status(400).json(data);
    }
  } catch (err) {
    const data = {
      Status: 500,
      message: "Delete comment thất bại",
    };
  }
});
module.exports = router;
