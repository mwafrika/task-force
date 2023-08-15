import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
import transanctionRoutes from "./routes/transanctionRoutes.js";
import auth from "./middleware/auth.js";

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
app.use("/api/transactions", auth, transanctionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
