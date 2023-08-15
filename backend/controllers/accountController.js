import Account from "../models/account.js";
import User from "../models/user.js";

export const createAccount = async (req, res) => {
  try {
    const { accountType, accountName, balance } = req.body;
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newAccount = new Account({
      userId,
      accountType,
      accountName,
      balance,
    });

    await newAccount.save();
    res
      .status(201)
      .json({ message: "Account created successfully", account: newAccount });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};

export const getAccounts = async (req, res) => {
  try {
    const userId = req.user.userId;
    if (!userId) {
      return res.status(404).json({ message: "User not found" });
    }
    const accounts = await Account.find({ userId });
    res.status(200).json({ accounts });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};

export const getAccount = async (req, res) => {
  try {
    const { accountId } = req.params;
    const account = await Account.findById(accountId);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    res.status(200).json({ account });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};

export const updateAccount = async (req, res) => {
  try {
    const { accountId } = req.params;
    const { accountType, accountName, balance } = req.body;

    const account = await Account.findById(accountId);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    account.accountType = accountType;
    account.accountName = accountName;
    account.balance = balance;

    await account.save();
    res.status(200).json({ message: "Account updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const { accountId } = req.params;
    const account = await Account.findById(accountId);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    await account.remove();
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};
