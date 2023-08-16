import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  accountType: { type: String, required: true },
  accountName: { type: String },
  balance: { type: Number, default: 0 },
  budget: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const account = mongoose.model("Account", AccountSchema);

export default account;
