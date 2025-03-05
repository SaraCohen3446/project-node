import { Router } from "express";
import { updateStatusOrder, getByUserId, deleteOrderByID, addOrder, getAllOrders } from "../controllers/order.js"
import { isUserIn } from "../middlewares/isUserIn.js";

const router = Router();
router.get("/",isUserIn, getAllOrders);
router.get("/:id",isUserIn, getByUserId);
router.delete("/:id",isUserIn, deleteOrderByID);
router.post("/", addOrder);
router.put("/:id",isUserIn, updateStatusOrder);

export default router;