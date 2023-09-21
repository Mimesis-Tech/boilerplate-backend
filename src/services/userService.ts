import { IUser } from "../types/userDTOs";
import { UserRepository } from "../repositories/userRepository";

const repository = new UserRepository();

export class UserService {
  async getAll(): Promise<IUser[]> {
    return repository.getAll();
  }
}
