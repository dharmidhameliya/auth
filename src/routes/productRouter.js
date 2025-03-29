import express from "express";
import {
  addProduct,
  uploads,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controller/productController.js";
import { middleware } from "../controller/middleware.js";
import { isAdmin } from "../utils/auth/isAdmin.js";
const router = express.Router();
// may sure to add middleware
router.post("/addProduct", middleware, isAdmin, uploads, addProduct);
router.get("/getproducts", middleware, getProducts);
router.put("/updateproduct/:id", middleware, isAdmin, updateProduct);
router.delete("/deleteproduct/:id", middleware, isAdmin, deleteProduct);

export default router;
