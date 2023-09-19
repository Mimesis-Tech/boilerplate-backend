import { User } from "../../models/user";
import { MongoUsersRepository } from "../../repository/getUsers/mongoGetUsers";
import { GetUsersController } from "../getUsers/getUsers";

describe("GetUsersController", () => {
  test("should return a list of users", async () => {
    const mongoUsersRepository = new MongoUsersRepository();
    const getUsersController = new GetUsersController(mongoUsersRepository);

    const { body, statusCode } = await getUsersController.handle();

    expect(statusCode).toBe(200);
    expect(Array.isArray(body)).toBe(true);

    //@ts-ignore
    body.forEach((user: User) => {
      expect(user.id).toBeDefined();
      expect(user.name).toBeDefined();
      expect(user.password).toBeDefined();
      expect(user.email).toBeDefined();
    });
  });
});
