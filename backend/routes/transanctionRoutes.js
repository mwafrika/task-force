import { Router } from "express";
import {
  createTransanction,
  getAccountTransactions,
  getTransanction,
  getReport,
  updateTransanction,
} from "../controllers/transactionController.js";

const router = Router()
  .get("/:accountId", getAccountTransactions)
  .get("/:accountId/:transanctionId", getTransanction)
  .post("/", createTransanction)
  .patch("/:transanctionId", updateTransanction);

export default router;
