import { Router } from "express";
import { add,deleteById,getAllProducts,getById,update } from "../Controllers/Product.js";

const router=Router();
router.get("/",getAllProducts);
router.get("/:id",getById);
router.delete("/:id",deleteById);
router.post("/",add);
router.put("/:id",update);

export default router;




