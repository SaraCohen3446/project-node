import { userModel } from "../Models/User.js";

export async function add_signUp(req, res) {

    if (!req.body.UserName || !req.body.email || !req.body.userPassword)
        return res.status(404).json({ title: "cmissing parameters", message: "username email password phone are required" })
    try {

        let newwUser = new userModel(req.body);
        await newwUser.save();
        res.json(newwUser)

    }
    catch (err) {
        console.log(err)
        res.status(400).json({ title: "cannot add", message: err.message })
    }
}
export async function getById(req, res) {
    let { userPassword } = req.params;
    try {
        let data = await userModel.findById(userPassword);
        if (!data)
            return res.status(404).json({ title: "cannot find by id", message: "user with such id not found" })
        res.json(data);
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ title: "cannot get all users", message: err.message })
    }
}
export async function getAllUsers(req, res) {
    try {
        let data = await userModel.find();
        res.json(data);
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ title: "cannot get all users", message: err.message })
    }
}
    export async function update(req, res) {

        let { userPassword } = req.params;
        try {
            let data = await userModel.findByIdAndUpdate(userPassword, req.body, { new: true });
            if (!data)
                return res.status(404).json({ title: "cannot find by id", message: "user with such id not found" })
            res.json(data);
        }
        catch (err) {
            console.log(err)
            res.status(400).json({ title: "cannot update user", message: err.message })
        }
    }
    export async function getUserByUsernamePassword_Login(req, res) {

        try {
            let data = await userModel.findOne({ userPassword: req.body.userPassword, UserName: req.body.UserName });
            if (!data)
                return res.status(404).json({ title: "cannot find user with such details", message: "wrong username or password" })
            res.json(data);
        }
        catch (err) {
            console.log(err)
            res.status(400).json({ title: "cannot log in user", message: err.message })
        }
    }