import { IUser } from "../types/userDTOs";
import userModel from "../models/user";

export class UserRepository {
  async getAll(): Promise<IUser[]> {
    return await userModel.find({});
  }
}
