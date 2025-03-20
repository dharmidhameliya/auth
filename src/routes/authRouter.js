import express from "express";
// import Joi from "joi";
import { register } from "../controller/authController.js";
const router = express.Router();

// Define the validation schema

router.post("/register", register);

export default router;
