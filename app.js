import express from "express";
import authRouter from "./src/routes/authRouter.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
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

// Routes
app.use("/api", authRouter);
app.use("*", (req, res, next) => {
  const errorMessage = "Route not found";
  console.error(`Error: ${errorMessage} | URL: ${req.originalUrl}`);

  return res.status(404).json({ message: errorMessage });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
