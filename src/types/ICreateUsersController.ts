import { User } from "../models/user";
import { HttpRequest } from "./HttpRequest";
import { HttpReponse } from "./HttpResponse";
import { ICreateUsersParams } from "./ICreateUsersParams";

export interface ICreateUserController {
  handle(
    HttpRequest: HttpRequest<ICreateUsersParams>
  ): Promise<HttpReponse<User>>;
}
