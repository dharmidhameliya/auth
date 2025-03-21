import express from "express";
// import Joi from "joi";
import {
  getAllUsers,
  login,
  register,
  getUserById,
} from "../controller/authController.js";
const router = express.Router();

// Define the validation schema

router.post("/register", register);
router.post("/login", login);
router.get("/getusers", getAllUsers);
router.get("/getusersbyid/:id", getUserById);

export default router;
