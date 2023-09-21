import { Router } from "express";
import { UserController } from "../controllers/userController";

export const userRoutes = Router();
const controller = new UserController();

userRoutes.get("/", controller.getUsers);
userRoutes.get("/email/:email", controller.getUserByEmail);
userRoutes.get("/id/:id", controller.getUserById);
userRoutes.post("/", controller.createUser);
userRoutes.post("/login", controller.nativeLogin);
userRoutes.put("/:id", controller.updateUserById);
userRoutes.delete("/delete/:id", controller.deleteUserById);
