import { Router } from "express";
import { MongoGetUsersRepository } from "./repository/getUsers/mongoGetUsers";
import { GetUsersController } from "./controllers/getUsers/getUsers";

export const router = Router();

router.get("/users", async (req, res) => {
  const mongoUsersRepository = new MongoGetUsersRepository();
  const getUsersController = new GetUsersController(mongoUsersRepository);

  const { body, statusCode } = await getUsersController.handle();

  res.send(body).status(statusCode);
});
