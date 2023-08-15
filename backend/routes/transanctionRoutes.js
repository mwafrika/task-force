import { Router } from "express";
import { getTransanctions } from "../controllers/transactionController.js";

const router = Router().get("/", getTransanctions);

export default router;
