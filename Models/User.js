import { Schema,model } from "mongoose";
const UserSchema= Schema({
    userId:Number,
    email:String,
    UserName:String,
    userPassword:String,
    role:{type:String,delete:"User"},
    registraDate:{type:Date,delete:new Date()},
})

export const userModel=model("User",UserSchema)