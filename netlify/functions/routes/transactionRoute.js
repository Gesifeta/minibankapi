import express from "express";

import {
  transferAmount,
  createDeposit,
  findTransaction,
  validateAccounts,
  findAllTransaction,
  //
} from "../controllers/transactionController.js";
const route = express.Router();

route.put("/transaction/deposit", createDeposit);
route.post("/transaction/transfer", transferAmount);
route.patch("/transaction/validate", validateAccounts);
route.get("/transaction/:userid", findTransaction);
route.get("/transactions", findAllTransaction);
export default route;
