// YOUR_BASE_DIRECTORY/netlify/functions/api.ts

import serverless from "serverless-http";

import express, { Router } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";


import customerRoutes from "./routes/customerRoute.js";
import accountRoute from "./routes/accountRoute.js";
import userRoutes from "./routes/userRoute.js";
import transactionRoute from "./routes/transactionRoute.js";
import feedbackRoute from "./routes/feedbackRoute.js";
import connectDB from "./config/db.js";
import path from "path";
// import { fileURLToPath } from "url";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const startServer=()=>{
    try {


dotenv.config();
connectDB();



api.use(express.json());
api.use(cors());
api.use(bodyParser.urlencoded({ extended: true }));
api.use(express.static(path.join(__dirname, "build")));
if (
    process.env.NODE_ENV === "production" ||
    process.env.NODE_ENV === "staging"
) {
    api.use(express.static("build"));
}
api.use((req, res, next) => {
    //doesn't send response just adjusts it
    res.header("Access-Control-Allow-Origin", "*"); //* to give access to any origin
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization" //to give access to all the headers provided
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET"); //to give access to all the methods provided
        return res.status(200).json();
    }
    next(); //so that other routes can take over
});

api.use("/api/", customerRoutes);
api.use("/api/", accountRoute);
api.use("/api/", userRoutes);
api.use("/api/", transactionRoute);
api.use("/api/", feedbackRoute);
api.use("/api/", router);



} catch (error) {
    return error.message;
}
}
const api = express();
const router = Router();
startServer();
export const handler = serverless(api);