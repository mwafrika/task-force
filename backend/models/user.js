import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, min: 6, max: 20 },
  name: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: String, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

export default User;
