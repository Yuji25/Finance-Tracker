import express from "express";
import {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transaction.controller.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";

const transactionRouter = express.Router();

transactionRouter.post("/", verifyAuth, createTransaction);
transactionRouter.get("/", verifyAuth, getTransactions);
transactionRouter.put("/:id", verifyAuth, updateTransaction);
transactionRouter.delete("/:id", verifyAuth, deleteTransaction);

export default transactionRouter
