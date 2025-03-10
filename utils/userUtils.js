import { userModel } from "../models/user.js";

// פונקציה לבדוק אם שם המשתמש כבר קיים
export const isUserNameTaken = async (userName) => {
    const existingUser = await userModel.findOne({ userName });
    return !!existingUser; // מחזיר true אם שם המשתמש כבר קיים, אחרת false
};
