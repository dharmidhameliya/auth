import Joi from "joi";

export const productValidationSchema = Joi.object({
  brandName: Joi.string().required(),
  p_description: Joi.string().trim().min(50).max(70).required(),
  size: Joi.string()
    .valid("s", "m", "l", "xl", "xxl", "xxxl", "xxxxl")
    .required()
    .messages({
      "any.only": "Size must be one of s, m, l, xl, xxl, xxxl, xxxxl",
    }),
  colors: Joi.array()
    .items(Joi.string().valid("red", "maroon", "pink", "white"))
    .min(1)
    .required()
    .messages({ "array.min": "At least one color is required" }),
  price: Joi.number()
    .min(1000)
    .max(50000)
    .required()
    .messages({ "number.min": "Price must be at least 1000" }),
  imageURL: Joi.string().uri().required().messages({
    "string.empty": "Image URL cannot be empty",
    "string.uri": "Invalid image URL format",
    "any.required": "Image URL is required",
  }),
});
