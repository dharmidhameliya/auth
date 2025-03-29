import express from "express";

import {
  getAllUsers,
  login,
  register,
  getUserById,
  getMe,
  updateUser,
} from "../controller/authController.js";
import { middleware } from "../controller/middleware.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getusers", getAllUsers);
router.get("/getusersbyid/:id", getUserById);
router.get("/me", middleware, getMe);
router.put("/updateuser/:id", middleware, updateUser);
export default router;
