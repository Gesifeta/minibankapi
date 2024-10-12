import express from "express";
import {
  createAccount,
  findAccount,
  updateAccount,
  deleteAccount,
} from "../controllers/accountsController.js";
import  authMiddleware  from "../middleware/authMiddleware.js";

const accountRoute = express.Router();

accountRoute.post("/account/create", createAccount);
accountRoute.get("/account/:userid",authMiddleware, findAccount);
accountRoute.put("/account/update", updateAccount);
accountRoute.delete("/account/delete", deleteAccount);

export default accountRoute;
