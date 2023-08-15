import { Router } from "express";
import {
  createSubcategory,
  getSubCategories,
  deleteSubcategory,
} from "../controllers/subcategoryController.js";

const router = Router()
  .get("/:categoryId", getSubCategories)
  .delete("/:subcategoryId", deleteSubcategory)
  .post("/", createSubcategory);

export default router;
