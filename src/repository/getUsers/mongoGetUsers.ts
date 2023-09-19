import { IGetUsersRepository } from "../../types/IGetUsersRepository";
import { User } from "../../models/user";

export class MongoUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    return [];
  }
}
