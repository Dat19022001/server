import express from "express";
const validator = require("validator");

import Category from "../models/category";

const router = express.Router();
//13. post category
router.post("", async (req, res) => {
  const newCategory = new Category({
    name: req.body.name,
    imgUrl: req.body.imgUrl,
  });
  try {
    if (
      !validator.isEmpty(newCategory.name) &&
      !validator.isEmpty(newCategory.imgUrl)
    ) {
      const saveCategory = await newCategory.save();
      const data = {
        Status: 200,
        message: "Thêm category Thành Công",
        data1: saveCategory,
      };
      res.status(200).json(data);
    } else {
      const data = {
        Status: 400,
        message: "Thêm Thất bại",
        data1: [],
      };
      res.status(400).json(data);
    }
  } catch (err) {
    const data = {
      Status: 500,
      message: "Thêm category thất bại",
      data1: [],
    };
    res.status(500).json(data);
  }
});

// 14.get category
router.get("", async (req, res) => {
  try {
    const category = await Category.find();
    if (category.length > 0) {
      const data = {
        Status: 200,
        message: "Successfully",
        data1: category,
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

module.exports = router;
