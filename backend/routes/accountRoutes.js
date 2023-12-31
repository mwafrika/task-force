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
  updateTransanction,
  deleteTransanction,
} from "../controllers/transactionController.js";

const router = Router()
  .get("/", getAccounts)
  .get("/:accountId", getAccount)
  .get("/:accountId/transactions", getAccountTransactions)
  .post("/:accountId/transactions", createTransanction)
  .patch("/:accountId/transactions/:transanctionId", updateTransanction)
  .delete("/:accountId/transactions/:transanctionId", deleteTransanction)
  .post("/", createAccount)
  .delete("/:accountId", deleteAccount)
  .patch("/:accountId", updateAccount);

export default router;
