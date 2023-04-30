import express from "express";
const validator = require("validator");
import Products from "../models/products";

const router = express.Router();

router.post("", async (req, res) => {
  const newProduct = new Products({
    id: req.body.id,
    Name: req.body.Name,
    author: req.body.author,
    imgUrl: req.body.imgUrl,
    datePublish: req.body.datePublish,
    description: req.body.description,
    pageNumber: req.body.pageNumber,
    buyNumber: req.body.buyNumber,
    rate: req.body.rate,
    comment: req.body.comment,
  });
  try {
    if (
      !validator.isEmpty(newProduct.id) &&
      !validator.isEmpty(newProduct.Name) &&
      !validator.isEmpty(newProduct.author) &&
      !validator.isEmpty(newProduct.imgUrl) &&
      !validator.isEmpty(newProduct.datePublish) &&
      !validator.isEmpty(newProduct.description) &&
      !isNaN(newProduct.pageNumber) &&
      !isNaN(newProduct.buyNumber) &&
      !isNaN(newProduct.rate)
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

router.delete("", async (req, res) => {
  const {id} = req.query
  try {
    const deletedProduct = await Products.findOneAndDelete({id:id});
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

router.put('', async (req, res) => {
  // const updatedProduct = await Products.findOneAndUpdate(
  //   { id: req.body.id },
  //   req.body,
  //   { new: true }
  // );
  // console.log(updatedProduct)
  try {
    const updatedProduct = await Products.findOneAndUpdate(
      { id: req.body.id },
      req.body,
      { new: true }
    );
    if(updatedProduct){
      const data = {
        Status:200,
        message:"Update thành Công",
        data1: updatedProduct
      }
      res.status(200).json(data)
    }
    else{
      const data = {
        Status:400,
        message:"Update Thất Bại",
        data1:[]
      }
      res.status(400).json(data)
    }
  } catch (error) {
    const data = {
      Status:500,
      message:"Update Thất Bại",
      data1:[]
    }
    res.status(500).json(data)
  }
});
module.exports = router;
