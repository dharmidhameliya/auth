import registerSchema from "../utils/validation/registrationSchema.js";
import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../services/tokens.js";

export const register = async (req, res, next) => {
  try {
    const { error, value } = registerSchema.validate(req.body);

    if (error) return res.status(400).json({ message: "Invalid request" });

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
