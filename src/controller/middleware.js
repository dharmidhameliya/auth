import { promisify } from "util";
import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
export const middleware = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  console.log(token);

  if (!token) {
    return res.status(404).json({ message: "token not provided" });
  }
  let decoded;
  try {
    decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const user = await User.findById(decoded.id);
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  req.user = user;
  next();
};
