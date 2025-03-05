import { Schema, model } from "mongoose"

const userSchema = Schema({
    userName: String,
    email: String,
    password: String,
    role: { type: String, default: "USER" },
    date: { type: Date, default: new Date() },
})

export const userModel = model("user", userSchema)