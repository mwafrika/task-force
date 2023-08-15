import { Router } from "express";
import {
  getCategories,
  createCategory,
} from "../controllers/categoryController.js";

const router = Router().get("/", getCategories).post("/", createCategory);

export default router;
