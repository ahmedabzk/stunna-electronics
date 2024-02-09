import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";


import authRouter from "./routes/auth.routes.js";
import productRouter from "./routes/product.routes.js";
import userRouter from "./routes/users.routes.js";
import stripeRouter from "./routes/stripe.routes.js";
import adminRouter from "./routes/admin/admin.routes.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });


const __dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/stripe",stripeRouter);
app.use("/api/v1/admin", adminRouter);

app.use(express.static(path.join(__dirname, "client/dist")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});


app.listen(3000, (err, res) => {
  console.log("listening on port 3000");
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "internal server error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});
