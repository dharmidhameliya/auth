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

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
