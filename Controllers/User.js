import { userModel } from "../models/user.js"
import { generateToken } from "../utils/generateToken.js";
//שליפת כל המשתמשים 
export const getAllUser = async (req, res) => {
    try {
        let data = await userModel.find().select('-password');
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ title: "cannot get all user", message: err.message })

    }
}
//שליפת משתמש לפי ID
export const getById = async (req, res) => {
    let { id } = req.params;
    try {
        let data = await userModel.findById(Types.ObjectId(id)).select('-password');
        if (!data) return res.status(404).json({ title: "cannot find by id", message: "user with such id not found" });
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(400).json({ title: "cannot get by id", message: err.message });
    }
};
//הוספת משתמש
export const addUser = async (req, res) => {
    let { body } = req;
    if (!body.password || !body.email)
        return res.status(400).json({ title: "cannot add user", message: "password, email are require" })


    // בדיקת תקינות המייל
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(body.email)) {
        return res.status(400).json({ title: "invalid email", message: "Please provide a valid email address." });
    }

    // בדיקת תקינות הסיסמה
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(body.password)) {
        return res.status(400).json({
            title: "invalid password",
            message: "Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character."
        });
    }
    try {
        let newUser = new userModel(body);
        await newUser.save();
        res.json(newUser);
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ title: "cannot add this user", message: err.message })
    }
}

//עדכון פרטי משתמש ללא סיסמא

export const update = async (req, res) => {
    let { id } = req.params;
    let body = req.body;
    if (body.password)
        return res.status(404).json({ title: "cannot update password", message: "cannot update here password" })
    try {
        let data = await userModel.findByIdAndUpdate(id, body, { new: true }).select('-password');
        if (!data) return res.status(404).json({ title: "cannot update by id", message: "user with such id not found" });
        res.json(data);
    } catch (err) {
        console.log(err)
        res.status(400).json({ title: "cannot update", message: err.message });
    }
}
//עדכון  סיסמא
export const updatePassword = async (req, res) => {
    let { id } = req.params;
    let body = req.body;
    if (!body.password || body.userName || body.email)
        return res.status(404).json({ title: "only update password", message: "cannot update email userName" })
    try {
        let data = await userModel.findByIdAndUpdate(id, { password: body.password }, { new: true }).select('-password');
        if (!data) return res.status(404).json({ title: "cannot update by id", message: "user with such id not found" });
        res.json(data);
    } catch (err) {
        console.log(err)
        res.status(400).json({ title: "cannot update", message: err.message });
    }
}


//כניסה 
export async function getUserByUsernamePassword_Login(req, res) {
    try {
        if (!req.body.password || !req.body.userName)
            return res.status(404).json({ title: "miising username or password", message: "missing" });
        let data = await userModel.findOne({ userName: req.body.userName }).lean();
        if (!data) {
            return res.status(404).json({ title: "no such user", message: "cannot found user with such username" });
        }
        if (data.password != req.body.password)
            return res.status(404).json({ title: "cannot found user with such deatekies", message: "worng password" });

        let token = generateToken({ ...userModel, role: "USER" });

        let { password, ...other } = data;

        other.token = token;
        console.log(other);
        res.json(other);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ title: "cannot log in user", message: err.message });
    }
}


