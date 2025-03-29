import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: String,
  password: { type: String, select: false },
  confirmPassword: String,
  isadmin: {
    type: Boolean,
    default: false,
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});
const User = model("User", userSchema);
export default User;
