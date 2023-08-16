import { Router } from "express";
import { getReport } from "../controllers/transactionController.js";

const router = Router().get("/:accountId", getReport);

export default router;
