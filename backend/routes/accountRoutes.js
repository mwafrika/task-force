import { Router } from "express";
import {
  createAccount,
  getAccount,
  getAccounts,
  deleteAccount,
  updateAccount,
} from "../controllers/accountController.js";
import {
  getAccountTransactions,
  createTransanction,
} from "../controllers/transactionController.js";

// /api/accounts/${accountId}/transactions
const router = Router()
  .get("/", getAccounts)
  .get("/:accountId", getAccount)
  .get("/:accountId/transactions", getAccountTransactions)
  .post("/:accountId/transactions", createTransanction)
  .post("/", createAccount)
  .delete("/:accountId", deleteAccount)
  .patch("/:accountId", updateAccount);

export default router;
