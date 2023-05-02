import mongoose from "mongoose";

const Category = new mongoose.Schema(
  {
    name:{type:String,require:true},
    imgUrl:{type:String,require:true},
  },{timestamps:true}
)

module.exports = mongoose.model("Category",Category)