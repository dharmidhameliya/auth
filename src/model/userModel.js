import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  confirmPassword: String,
  isadmin: {
    type: Boolean,
    default: false,
  },
});

const User = model("User", userSchema);
export default User;
