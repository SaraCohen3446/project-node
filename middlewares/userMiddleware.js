import { isUserNameTaken } from "../utils/userUtils.js";

export const checkUserNameAvailability = async (req, res, next) => {
    const { userName } = req.body;

    const taken = await isUserNameTaken(userName);
    if (taken) {
        return res.status(400).json({ message: "שם המשתמש כבר קיים" });
    }

    next(); // אם שם המשתמש פנוי, נעבור למידלוואר הבא או לפונקציה ב-controller
}