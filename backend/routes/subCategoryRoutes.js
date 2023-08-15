import { Router } from "express";
import {
  createSubcategory,
  getSubCategories,
  deleteSubcategory,
  updateSubcategory,
} from "../controllers/subcategoryController.js";

const router = Router()
  .get("/:categoryId", getSubCategories)
  .delete("/:subcategoryId", deleteSubcategory)
  .post("/", createSubcategory)
  .patch("/:subcategoryId", updateSubcategory);

export default router;
