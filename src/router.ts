import { Router } from "express";
import { MongoGetUsersRepository } from "./repository/getUsers/mongoGetUsers";
import { GetUsersController } from "./controllers/getUsers/getUsers";
import { MongoCreateUserRepository } from "./repository/createUsers/mongoCreateUsers";
import { CreateUserController } from "./controllers/createUsers/createUsers";

export const router = Router();

router.get("/users", async (req, res) => {
  const mongoUsersRepository = new MongoGetUsersRepository();
  const getUsersController = new GetUsersController(mongoUsersRepository);

  const { body, statusCode } = await getUsersController.handle();

  res.status(statusCode).send(body);
});

router.post("/users", async (req, res) => {
  const mongoCreateUserRepository = new MongoCreateUserRepository();
  const createUserController = new CreateUserController(
    mongoCreateUserRepository
  );

  const { body, statusCode } = await createUserController.handle({
    body: req.body,
  });

  res.status(statusCode).send(body);
});
