import Category from "../models/category.js";
import User from "../models/user.js";
import Subcategory from "../models/subcategory.js";

export const getCategories = async (req, res) => {
  try {
    const userId = req.user.userId;

    const categories = await Category.find({ userId });

    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  const newCategory = new Category({ name, userId: req.user.userId });

  try {
    await newCategory.save();

    res.status(201).json({
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
