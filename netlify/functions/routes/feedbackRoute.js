import express from "express";
import { createFeedback,findFeedback,updateFeedback,deleteFeedback } from "../controllers/feedbackController.js";
const feedbackRoute = express.Router();

feedbackRoute.post("/feedback/create", createFeedback);
feedbackRoute.get("/feedback/find", findFeedback);
feedbackRoute.put("/feedback/update", updateFeedback);
feedbackRoute.delete("/feedback/delete", deleteFeedback);

export default feedbackRoute;
