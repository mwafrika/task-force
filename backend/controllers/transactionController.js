import Transanction from "../models/transanction.js";
import User from "../models/user.js";
import Account from "../models/account.js";
import Category from "../models/category.js";

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

// Generate a report according to the desired time gap.

export const getReport = async (req, res) => {
  const { startDate, endDate } = req.query;
  const userId = req.user.userId;
  const { accountId } = req.params;

  const parsedStartDate = new Date(startDate);
  const parsedEndDate = new Date(endDate);

  try {
    // Check if the user exists
    const user = await User.findById(userId);

    console.log(user, "Account");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const account = await Account.findOne({ _id: accountId, userId });
    console.log(account, "Account");
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    if (startDate > endDate) {
      return res.status(400).json({ message: "Invalid dates" });
    }

    // Get the transactions

    const transactions = await Transanction.find({
      accountId,
      createdAt: { $gte: parsedStartDate, $lt: parsedEndDate },
    });

    console.log(transactions, "transactions");

    // Check if there are any transactions
    if (transactions.length === 0) {
      return res
        .status(404)
        .json({ message: "No transactions found within the given time frame" });
    }

    // Calculate the total income and expense
    let totalIncome = 0;
    let totalExpense = 0;
    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        totalIncome += transaction.amount;
      }
      if (transaction.type === "expense") {
        totalExpense += transaction.amount;
      }
    });

    // Calculate the net balance
    const netBalance = totalIncome - totalExpense;

    res.status(200).json({ totalIncome, totalExpense, netBalance });
    // }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const isValidDate = (date) => {
  return date instanceof Date && !isNaN(date);
};
