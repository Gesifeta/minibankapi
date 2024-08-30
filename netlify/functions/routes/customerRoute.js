import express from "express";
import {
  findCustomer,
  createCustomer,
  udpdateCustomer,
  deleteCustomer,
} from "../controllers/customerController.js";
const customerRoutes = express.Router();

customerRoutes.get("/customer/find", findCustomer);
customerRoutes.post("/customer/register", createCustomer);
customerRoutes.put("/customer/update", udpdateCustomer);
customerRoutes.delete("/customer/delete", deleteCustomer);
export default customerRoutes;
