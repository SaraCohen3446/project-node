import { Router } from "express";
import { getAllProducts, deleteById, getById, addProduct, update, totalPages } from "../controllers/product.js"
import { isUserIn } from "../middlewares/isUserIn.js";

const router = Router();
router.get("/", getAllProducts);
router.get("/total", totalPages);
router.get("/:id", getById);
router.delete("/:id",isUserIn, deleteById);
router.post("/", addProduct);
router.put("/:id", update);

export default router;