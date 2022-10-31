import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./Routes/auth.js";
import usersRoute from "./Routes/users.js";
import packagesRoute from "./Routes/packeges.js"
import orderRoute from "./Routes/order.js";
import paymentRouter from './Routes/payment.js';
import Razorpay from 'razorpay';

import cookieParser from "cookie-parser";
import cors from "cors";
import { verifyToken } from "./utils/verifyToken.js";

const app = express();
app.use(express.json());
dotenv.config();
const port = process.env.PORT || 8800
const connect = async () => {
  try {
    mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};
// Razor pay instance

export const instance = new Razorpay({
  key_id: 'rzp_test_lcHJLOx5f3LGWn',
  key_secret: 'KCTYky5VAxWHQaTlvSmhKOnC'
});

// ---------------------------
mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

//middlewares

app.use(cors())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/packages", packagesRoute);
app.use("/api/orders",orderRoute);
app.use("/api/payment",paymentRouter);
app.get('/api/getkey',verifyToken,(req,res)=>{
  res.status(200).json({"success": true,key:process.env.RAZORPAY_API_KEY })
})


app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(port, () => {
  connect();
  console.log("Connected to backend.");
});