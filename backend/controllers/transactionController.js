import Transanction from "../models/transanction.js";
import User from "../models/user.js";
import Account from "../models/account.js";
import { Types } from "mongoose";

export const createTransanction = async (req, res) => {
  const { type, amount, category, note } = req.body;
  const userId = req.user.userId;
  const { accountId } = req.params;

  const parsedAmount = parseInt(amount, 10);

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
    if (parsedAmount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    // Check if the type is valid
    if (type !== "income" && type !== "expense") {
      return res.status(400).json({ message: "Invalid type" });
    }

    // Check if budget is exceeded for expense transactions
    if (type === "expense" && account.balance - parsedAmount < account.budget) {
      return res.status(400).json({ message: "Budget exceeded" });
    }

    // Save the transaction
    const newTransaction = new Transanction({
      userId,
      accountId,
      type,
      amount: parsedAmount,
      category,
      note,
    });
    await newTransaction.save();

    // Update the account balance
    if (type === "income") {
      account.balance += parsedAmount;
    }
    if (type === "expense") {
      account.balance -= parsedAmount;
    }
    await account.save();

    res.status(201).json({
      message: "Transaction created successfully",
      transaction: newTransaction,
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// track all in and out transactions from each account.

export const getAccountTransactions = async (req, res) => {
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

    const transanctions = await Transanction.find({ accountId }).populate({
      path: "category",
      populate: {
        path: "subcategories",
        model: "Subcategory",
      },
    });

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
    const transanction = await Transanction.findById(transanctionId).populate({
      path: "category",
      populate: {
        path: "subcategories",
        model: "Subcategory",
      },
    });

    if (!transanction) {
      return res.status(404).json({ message: "Transanction not found" });
    }
    res.status(200).json(transanction);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getReport = async (req, res) => {
  const { startDate, endDate } = req.query;
  const userId = req.user.userId;
  const { accountId } = req.params;

  const parsedStartDate = new Date(startDate);
  const parsedEndDate = new Date(endDate);

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const account = await Account.findOne({ _id: accountId, userId });
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    if (parsedStartDate > parsedEndDate) {
      return res.status(400).json({ message: "Invalid dates" });
    }

    const transactions = await Transanction.aggregate([
      {
        $match: {
          accountId: new Types.ObjectId(accountId),
          createdAt: { $gte: parsedStartDate, $lt: parsedEndDate },
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $lookup: {
          from: "subcategories",
          localField: "subcategoryId",
          foreignField: "_id",
          as: "subcategory",
        },
      },
      {
        $unwind: "$category",
      },

      {
        $lookup: {
          from: "subcategories",
          localField: "category.subcategories",
          foreignField: "_id",
          as: "category.subcategories",
        },
      },
      {
        $group: {
          _id: null,
          totalIncome: {
            $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] },
          },
          totalExpense: {
            $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] },
          },
          netBalance: {
            $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] },
          },
          transactions: {
            $push: "$$ROOT",
          },
        },
      },
    ]);

    console.log(transactions, "Transanctions");
    if (!transactions || transactions.length === 0) {
      return res
        .status(404)
        .json({ message: "No transactions found within the given time frame" });
    }

    res.status(200).json({
      totalIncome: transactions[0].totalIncome,
      totalExpense: transactions[0].totalExpense,
      netBalance: transactions[0].netBalance,
      transactions: transactions[0].transactions,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTransanction = async (req, res) => {
  const { type, amount, category, note } = req.body;
  const userId = req.user.userId;

  const parsedAmount = parseInt(amount, 10);

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const transaction = await Transanction.findOne({
      _id: req.params.transanctionId,
      userId,
    });
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    if (parsedAmount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    if (type !== "income" && type !== "expense") {
      return res.status(400).json({ message: "Invalid type" });
    }

    if (type === "expense" && parsedAmount > transaction.amount) {
      const account = await Account.findOne({
        _id: transaction.accountId,
        userId,
      });
      if (!account) {
        return res.status(404).json({ message: "Account not found" });
      }
      if (account.balance - parsedAmount < account.budget) {
        return res.status(400).json({ message: "Budget exceeded" });
      }
    }

    // Update the transaction
    transaction.type = type;
    transaction.amount = parsedAmount;
    transaction.category = category;
    transaction.note = note;
    await transaction.save();

    // Update the account balance
    const account = await Account.findOne({
      _id: transaction.accountId,
      userId,
    });
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    if (type === "income") {
      account.balance += parsedAmount - transaction.amount;
    }
    if (type === "expense") {
      account.balance -= parsedAmount - transaction.amount;
    }
    await account.save();

    res.status(200).json({
      message: "Transaction updated successfully",
      transaction,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
