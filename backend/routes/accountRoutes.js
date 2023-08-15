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
  .get("/:id", getAccount)
  .post("/", createAccount)
  .delete("/:id", deleteAccount)
  .patch("/:id", updateAccount);

export default router;
