import validator from "validator";
import { User } from "../../models/user";
import { HttpRequest } from "../../types/HttpRequest";
import { HttpReponse } from "../../types/HttpResponse";
import { ICreateUserController } from "../../types/ICreateUsersController";
import { ICreateUsersParams } from "../../types/ICreateUsersParams";
import { ICreateUserRepository } from "../../types/ICreateUsersRepository";

export class CreateUserController implements ICreateUserController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<ICreateUsersParams>
  ): Promise<HttpReponse<User>> {
    try {
      const requiredFields = ["name", "email", "password"];

      for (const field of requiredFields) {
        if (!httpRequest?.body[field as keyof ICreateUsersParams]?.length) {
          return {
            statusCode: 400,
            body: `Field ${field} is required`,
          };
        }
      }

      const emailIsValid = validator.isEmail(httpRequest.body?.email);

      if (!emailIsValid) {
        return {
          statusCode: 400,
          body: "E-mail is invalid",
        };
      }

      const user = await this.createUserRepository.createUser(httpRequest.body);

      return {
        statusCode: 201,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong.",
      };
    }
  }
}
