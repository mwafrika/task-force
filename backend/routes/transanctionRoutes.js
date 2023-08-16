import { Router } from "express";
import {
  createTransanction,
  getTransanctions,
  getTransanction,
} from "../controllers/transactionController.js";

const router = Router()
  .get("/:accountId", getTransanctions)
  .get("/:accountId/:transanctionId", getTransanction)
  .post("/", createTransanction);

export default router;
