import { Router } from "express";
import { register, login } from "../controllers/userController.js";

const router = Router().post("/register", register).post("/login", login);

export default router;
