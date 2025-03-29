import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  brandName: { type: String, required: true },
  p_description: {
    type: String,
    required: true,
    minlength: 50,
    maxlength: 70,
  },
  size: {
    type: String,
    enum: ["s", "m", "l", "xl", "xxl", "xxxl", "xxxxl"],
    required: true,
  },
  colors: [
    { type: String, enum: ["red", "maroon", "pink", "white"], required: true },
  ],
  price: { type: Number, required: true, min: 1000, max: 50000 },
  imageURL: { type: String, required: true },
  productAddedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      select: true,
    },
  ],
});

export const Product = mongoose.model("Product", productSchema);
