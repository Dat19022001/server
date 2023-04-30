import mongoose from "mongoose";

const Cart = mongoose.Schema({
  UserId:{type:String,require:true,unique:true},
  products:[
    {
      productId:{type:String,require:true},
      productName:{type:String,require:true},
      productImg:{type:String,require:true},
      productPrice:{type:Number,require:true,integer:true},
      quantity:{type:Number,require:true,integer:true}
    }
  ]
},{timestamps:true});

module.exports = mongoose.model("Carts",Cart)
