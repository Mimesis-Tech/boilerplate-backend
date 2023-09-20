import { User } from "../models/user";
import { ICreateUsersParams } from "./ICreateUsersParams";

export interface ICreateUserRepository {
  createUser(params: ICreateUsersParams): Promise<User>;
}
