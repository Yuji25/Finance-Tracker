import express from "express";
import { verifyAuth } from "../middlewares/auth.middleware.js";
import {
  getUserBalance,
  getCategoryStats,
  getLenDenSummary,
} from "../controllers/analytics.controller.js";

const analyticsRouter = express.Router();

analyticsRouter.get("/balance", verifyAuth, getUserBalance);
analyticsRouter.get("/category-stats", verifyAuth, getCategoryStats);
analyticsRouter.get("/len-den-summary", verifyAuth, getLenDenSummary);

export default analyticsRouter;