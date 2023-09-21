import { Router } from "express";
import { UserController } from "../controllers/userController";

export const userRoutes = Router();
const controller = new UserController();

userRoutes.get("/", controller.getUsers);
userRoutes.get("/email/:email", controller.getByEmail);
userRoutes.get("/id/:id", controller.getById);
userRoutes.post("/", controller.createUser);
