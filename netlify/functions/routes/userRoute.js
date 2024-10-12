import express from "express";
import authMiddleware from "./../middleware/authMiddleware.js"

import {
  findUser,
  loginUser,
  createUser,
  updateUser,
  deleteUser,
  logoutUser,
} from "../controllers/userController.js";
const route = express.Router();

route.post("/user/create", createUser);
route.get("/user/find",authMiddleware, findUser);
route.post("/user/login", loginUser);
route.put("/user/update",authMiddleware, updateUser);
route.delete("/user/delete",authMiddleware, deleteUser);
route.get("/user/logout", logoutUser);

export default route;
