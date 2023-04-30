import mongoose from "mongoose";

const Product = new mongoose.Schema(
  {
    id:{type: String,require: true,unique:true},
    Name:{type:String,require:true},
    author:{type:String,require:true},
    imgUrl:{type:String,require:true},
    datePublish:{type:String,require:true},
    description:{type:String,require:true},
    pageNumber:{type:Number,require:true,integer: true},
    buyNumber:{type:Number,require:true,integer: true},
    price:{type:Number,require:true,integer:true},
    rate:{type:Number,require:true,float:true},
    comment:[
      {
        UserId:{type:String,require:true},
        content:{type:String,require:true},
        date:{type:String,require:true},
      }
    ]
  },
  { timestamps: true }
)

module.exports = mongoose.model("Products",Product);
