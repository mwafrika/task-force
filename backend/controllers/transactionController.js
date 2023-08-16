import Transanction from "../models/transanction.js";
import User from "../models/user.js";
import Account from "../models/account.js";
import Category from "../models/category.js";

export const createTransanction = async (req, res) => {
  const { accountId, type, amount, category, note, date } = req.body;
  const userId = req.user.userId;

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the account exists and belongs to the user
    const account = await Account.findOne({ _id: accountId, userId });
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Check if the amount is valid
    if (amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    // Check if the type is valid
    if (type !== "income" && type !== "expense") {
      return res.status(400).json({ message: "Invalid type" });
    }

    // Check if the date is valid
    if (date > Date.now()) {
      return res.status(400).json({ message: "Invalid date" });
    }

    // Check if budget is exceeded for expense transactions
    if (type === "expense" && account.balance - amount < account.budget) {
      return res.status(400).json({ message: "Budget exceeded" });
    }

    // Save the transaction
    const newTransaction = new Transanction({
      userId,
      accountId,
      type,
      amount,
      category,
      note,
      date,
    });
    await newTransaction.save();

    // Update the account balance
    if (type === "income") {
      account.balance += amount;
    }
    if (type === "expense") {
      account.balance -= amount;
    }
    await account.save();

    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getTransanctions = async (req, res) => {
  const { accountId } = req.params;
  const userId = req.user.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const account = await Account.findOne({ _id: accountId, userId });
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    const transanctions = await Transanction.find({ accountId });
    res.status(200).json(transanctions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTransanction = async (req, res) => {
  const { transanctionId } = req.params;
  const userId = req.user.userId;

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Get the transanction
    const transanction = await Transanction.findById(transanctionId);
    if (!transanction) {
      return res.status(404).json({ message: "Transanction not found" });
    }
    res.status(200).json(transanction);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
