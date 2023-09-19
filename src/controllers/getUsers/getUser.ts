import { IGetUsersController } from "../../types/IGetUsersController";
import { IGetUsersRepository } from "../../types/IGetUsersRepository";

export class GetUsersController implements IGetUsersController {
  constructor(private readonly getUserRepository: IGetUsersRepository) {}

  async handle() {
    try {
      const users = await this.getUserRepository.getUsers();

      return {
        statusCode: 200,
        body: users,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong.",
      };
    }
  }
}
