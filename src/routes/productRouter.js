import express from "express";
import {
  addProduct,
  uploads,
  getProducts,
  updateProduct,
} from "../controller/productController.js";
import { middleware } from "../controller/middleware.js";
const router = express.Router();
// may sure to add middleware
router.post("/addProduct", middleware, addProduct);
router.post("/uploads", middleware, uploads);
router.get("/getproducts", middleware, getProducts);
router.put("/updateproduct/:id", updateProduct);
export default router;
