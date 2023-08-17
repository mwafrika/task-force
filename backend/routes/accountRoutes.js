import { Router } from "express";
import {
  createAccount,
  getAccount,
  getAccounts,
  deleteAccount,
  updateAccount,
} from "../controllers/accountController.js";
import { getAccountTransactions } from "../controllers/transactionController.js";

// /api/accounts/${accountId}/transactions
const router = Router()
  .get("/", getAccounts)
  .get("/:accountId", getAccount)
  .get("/:accountId/transactions", getAccountTransactions)
  .post("/", createAccount)
  .delete("/:accountId", deleteAccount)
  .patch("/:accountId", updateAccount);

export default router;
