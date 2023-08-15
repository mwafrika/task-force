import { Router } from "express";
import { register } from "../controllers/userController.js";

const router = Router().post("/register", register);

export default router;
