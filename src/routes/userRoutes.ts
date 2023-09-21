import { Router } from "express";
import { UserController } from "../controllers/userController";

export const userRoutes = Router();
const controller = new UserController();

userRoutes.get("/", controller.getUsers);
