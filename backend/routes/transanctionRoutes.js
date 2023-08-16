import { Router } from "express";
import {
  createTransanction,
  getAccountTransactions,
  getTransanction,
  getReport,
} from "../controllers/transactionController.js";

const router = Router()
  .get("/:accountId", getAccountTransactions)
  .get("/:accountId/:transanctionId", getTransanction)
  .post("/", createTransanction);

export default router;
