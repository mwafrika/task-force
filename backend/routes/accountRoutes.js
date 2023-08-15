import { Router } from "express";
import {
  createAccount,
  getAccount,
  getAccounts,
  deleteAccount,
  updateAccount,
} from "../controllers/accountController.js";

const router = Router()
  .get("/", getAccounts)
  .get("/:accountId", getAccount)
  .post("/", createAccount)
  .delete("/:accountId", deleteAccount)
  .patch("/:accountId", updateAccount);

export default router;
