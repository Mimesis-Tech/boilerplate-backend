import { ICreateUserDTO, IUser } from "../types/userDTOs";
import userModel from "../models/user";

export class UserRepository {
  async getAll(): Promise<IUser[]> {
    return await userModel.find({});
  }

  async create(user: ICreateUserDTO): Promise<string> {
    const { _id } = await userModel.create(user);
    return _id as unknown as string;
  }

  async getById(_id: string): Promise<IUser> {
    const user = await userModel.findOne({ _id }).exec();
    return user as unknown as IUser;
  }
}
