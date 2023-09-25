import { Router } from "express";
import { AuthController } from "../controllers/authController";

export const authRoutes = Router();
const controller = new AuthController();

authRoutes.post("/login", controller.login);
