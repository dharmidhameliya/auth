import { registerSchema } from "../utils/validation/registrationSchema.js";
import { loginSchema } from "../utils/validation/loginSchema.js";
import User from "../model/userModel.js";
import bcrypt from "bcrypt";
// import Joi from "joi";
import {
  generateToken,
  generateAccessToken,
  generateRefreshToken,
} from "../services/tokens.js";
export const register = async (req, res, next) => {
  try {
    const { error, value } = registerSchema.validate(req.body);

    if (error) return res.status(400).json({ message: error.message });

    const { name, email, password, isadmin = false } = value;

    if (await User.exists({ email })) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      isadmin,
    });

    const token = generateToken(user.id);

    return res.status(201).json({
      status: "success",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isadmin: user.isadmin,
      },
      token,
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    const { email, password } = value;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (error) {
      return res.status(404).json({ message: error });
    }

    if (!isPasswordValid) {
      return res.status(404).json({ message: "Password does not exist" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    return res.status(201).json({
      status: "success",
      user: {
        email: user.email,
        name: user.name,
        id: user._id,
        isadmin: user.isadmin,
      },
      accessToken,
      refreshToken,
    });
  } catch (err) {
    return next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    console.log(users);

    if (!users) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ users });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const users = await User.findById(req.params.id);

    if (!users) {
      return res
        .status(400)
        .json({ message: "user not found with the particular " });
    }
    return res.status(200).json({ message: users });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const getMe = (req, res) => {
  try {
    const userdata = req.user;
    return res.status(200).json(userdata);
  } catch (err) {
    return res.status(404).json({ message: err });
  }
};
