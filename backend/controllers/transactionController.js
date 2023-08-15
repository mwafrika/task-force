import Transanction from "../models/transanction.js";
import User from "../models/user.js";
import Account from "../models/account.js";
import Category from "../models/category.js";

export const createTransanction = async (req, res) => {
  // const { type, amount, category, note, date } = req.body;
  // const userId = req.user.userId;
  // const accountId = req.params.id;
  // const account = await Account.findOne({ _id: accountId, userId });
  // const category = await Category.findOne({ _id: category, userId });
  // const newTransanction = new Transanction({
  //   userId,
  //   accountId,
  //   type,
  //   amount,
  //   category,
  //   note,
  //   date,
  // });
  // try {
  //   // Check if the user exists
  //   const user = await User.findById(userId);
  //   if (!user) {
  //     return res.status(404).json({ message: "User not found" });
  //   }
  //   // Check if the account exists and belongs to the user
  //   const account = await Account.findOne({ _id: accountId, userId });
  //   if (!account) {
  //     return res.status(404).json({ message: "Account not found" });
  //   }
  //   // Check if the category exists and belongs to the user
  //   const category = await Category.findOne({ _id: category, userId });
  //   if (!category) {
  //     return res.status(404).json({ message: "Category not found" });
  //   }
  //   // Check if the amount is valid
  //   if (amount <= 0) {
  //     return res.status(400).json({ message: "Invalid amount" });
  //   }
  //   // Check if the type is valid
  //   if (type !== "income" && type !== "expense") {
  //     return res.status(400).json({ message: "Invalid type" });
  //   }
  //   // Check if the date is valid
  //   if (date > Date.now()) {
  //     return res.status(400).json({ message: "Invalid date" });
  //   }
  //   // Save the transanction
  //   await newTransanction.save();
  //   // Update the account balance
  //   if (type === "income") {
  //     account.balance += amount;
  //   }
  //   if (type === "expense") {
  //     account.balance -= amount;
  //   }
  //   await account.save();
  //   res.status(201).json(newTransanction);
  // } catch (error) {
  //   res.status(409).json({ message: error.message });
  // }
};
