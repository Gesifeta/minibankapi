import express from "express";

import  protect  from "../../../middleware/authMiddleware.js";

import {
  findUser,
  loginUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
const route = express.Router();

route.post("/user/create", createUser);
route.get("/user/find", findUser);
route.post("/user/login", loginUser);
route.put("/user/update", updateUser);
route.delete("/user/delete", deleteUser);

export default route;
