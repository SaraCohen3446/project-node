import { Schema,model } from "mongoose";

const productSchema= Schema({
    productId:Number,
    productName:String,
    description:String,
    createDate:Date,
    productPicture:String,
    //מערך
})

export const productModel=model("Product",productSchema)