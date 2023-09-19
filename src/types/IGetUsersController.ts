import { User } from "../models/user";
import { HttpReponse } from "./HttpResponse";

export interface IGetUsersController {
  handle(): Promise<HttpReponse<User[]>>;
}
