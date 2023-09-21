import { ICreateUserDTO, IUpdateUserDTO, IUser } from "../types/userDTOs";
import userModel from "../models/user";

export class UserRepository {
  async getAll(): Promise<IUser[]> {
    return await userModel.find({}, "_id name email photo");
  }

  async create(user: ICreateUserDTO): Promise<string> {
    const { _id } = await userModel.create(user);
    return _id as unknown as string;
  }

  async deleteById(_id: string): Promise<void> {
    await userModel.deleteOne({ _id }).exec();
  }

  async updateById(
    _id: string,
    user: IUpdateUserDTO
  ): Promise<IUser | unknown> {
    return userModel.findByIdAndUpdate({ _id }, user).exec();
  }

  async getById(_id: string): Promise<IUser> {
    const user = await userModel
      .findOne({ _id }, "_id name email photo")
      .exec();
    return user as unknown as IUser;
  }

  async getByEmail(email: string): Promise<IUser> {
    const user = await userModel
      .findOne({ email }, "_id name email photo")
      .exec();
    return user as unknown as IUser;
  }
}
