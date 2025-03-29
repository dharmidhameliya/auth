import express from "express";
import authRouter from "./src/routes/authRouter.js";
import productRouter from "./src/routes/productRouter.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

app.use(express.urlencoded({ extended: true })); // Keep this for form data (not file uploads)

// File Upload Middleware (Keep it separate)
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
// Routes
app.use("/api", authRouter);
app.use("/api", productRouter);
app.use("*", (req, res, next) => {
  const errorMessage = "Route not found";
  console.error(`Error: ${errorMessage} | URL: ${req.originalUrl}`);
  return res.status(404).json({ message: errorMessage });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
