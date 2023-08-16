import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
import TransanctionRoutes from "./routes/transanctionRoutes.js";
import Account from "./routes/accountRoutes.js";
import auth from "./middleware/auth.js";
import Category from "./routes/categoryRoutes.js";
import subCategory from "./routes/subCategoryRoutes.js";
import Report from "./routes/reportRoutes.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db();

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use("/api/auth", userRoutes);
app.use("/api/transactions", auth, TransanctionRoutes);
app.use("/api/accounts", auth, Account);
app.use("/api/categories", auth, Category);
app.use("/api/subcategories", auth, subCategory);
app.use("/api/report", auth, Report);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
