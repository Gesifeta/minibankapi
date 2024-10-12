// YOUR_BASE_DIRECTORY/netlify/functions/api.ts

import serverless from "serverless-http";

import express from "express";
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

const api = express();
dotenv.config();

connectDB();
api.use(express.json());
api.use(cors({
    origin:  "https://myminibanking.netlify.app",
}));
api.use(bodyParser.urlencoded({ extended: true }));
api.use(express.static(path.join(__dirname, "build")));
if (
    process.env.NODE_ENV === "production" ||
    process.env.NODE_ENV === "staging"
) {
    api.use(express.static("build"));
}
api.use("/api", customerRoutes);
api.use("/api", accountRoute);
api.use("/api", userRoutes);
api.use("/api", transactionRoute);
api.use("/api", feedbackRoute);
api.get("/api/index", (req, res) => {
   res.send("Welcome to Minibanking API, Designed by Gemechu Gesifeta")
});
api.use((error, req, res, next) => {
    res.status(500)
    res.send({error: error})
    console.error(error.stack)
    next(error)
  })
// api.listen(process.env.REACT_APP_PORT || 8000, () => {
//     console.log(`Server is running on PORT ${process.env.REACT_APP_PORT}`);
// }); 
export const handler =  serverless(api);