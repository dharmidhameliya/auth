import cloudinary from "../config/cloudinary.js";
import { productValidationSchema } from "../utils/validation/productSchema.js";
import { Product } from "../model/productModel.js";
export const addProduct = async (req, res) => {
  try {
    const { error, value } = productValidationSchema.validate(req.body);
    const { brandName, p_description, size, colors, price, imageURL } = value;

    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const product = await Product.create({
      brandName,
      p_description,
      size,
      colors,
      price,
      imageURL,
    });
    return res.status(201).json({ status: "success", product });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const uploads = async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const file = req.files.image;
    const uploadedResponse = await cloudinary.uploader.upload(
      file.tempFilePath,
      {
        folder: "uploads",
        resource_type: "auto",
      }
    );
    res.json({ imageUrl: uploadedResponse.secure_url });
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const getproduct = await Product.find();

    if (!getproduct) {
      return res.status(401).json({ message: "no product found" });
    }

    return res.status(201).json({
      status: "success",
      product: {
        getproduct,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const id = await Product.findById(req.params.id);
    const updateData = req.body;
    if (!id) {
      return res.status(401).json({ message: "id required" });
    }
    const getdata = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    return res.status(401).json({ getdata });
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};
