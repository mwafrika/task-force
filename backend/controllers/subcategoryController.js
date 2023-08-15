import SubCategory from "../models/subcategory.js";
import Category from "../models/category.js";

export const createSubcategory = async (req, res) => {
  try {
    const { categoryId, name } = req.body;

    const category = await Category.findById(categoryId).populate(
      "subcategories"
    );
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const newSubcategory = new SubCategory({
      categoryId,
      name,
    });

    category.subcategories.push(newSubcategory);

    await category.save();
    await newSubcategory.save();

    res.status(201).json({
      message: "Subcategory created successfully",
      subcategory: newSubcategory,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSubCategories = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    const subcategories = await SubCategory.find({ categoryId });

    res.json({ subcategories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSubcategory = async (req, res) => {
  try {
    const { subcategoryId } = req.params;

    const subcategory = await SubCategory.findByIdAndDelete(subcategoryId);
    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    const category = await Category.findById(subcategory.categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.subcategories = category.subcategories.filter(
      (sub) => sub._id.toString() !== subcategoryId
    );
    await category.save();

    res.json({ message: "Subcategory deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSubcategory = async (req, res) => {
  try {
    const { subcategoryId } = req.params;
    const { name } = req.body;

    const subcategory = await SubCategory.findById(subcategoryId);
    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    subcategory.name = name;
    await subcategory.save();

    const category = await Category.findOne({ subcategories: subcategoryId });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const subcategoryIndex = category.subcategories.findIndex(
      (sub) => sub._id.toString() === subcategoryId
    );

    if (subcategoryIndex !== -1) {
      category.subcategories[subcategoryIndex].name = name;
      await category.save();
    }

    res.json({ message: "Subcategory updated successfully", subcategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
