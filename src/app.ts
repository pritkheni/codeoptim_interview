import dotenv from "dotenv";
//load .env
dotenv.config();

import { connectDb } from "./config/db";
//connect to db
// add comment from dev 1
// add comment from dev 1 => 2
connectDb();

import express, { Request, Response } from "express";
import cors from "cors";
import apiRoute from "./routes/apiRoute";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//health route
app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "health OK!" });
});

//api routes
app.use("/api", apiRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[server] runnign at http://localhost:${PORT}`);
});

//check from dev 1 
// another changes from dev 1