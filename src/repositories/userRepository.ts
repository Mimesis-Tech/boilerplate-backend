import { ICreateUserDTO, IUpdateUserDTO, IUser } from "../types/userDTOs";
import userModel from "../models/user";
import { BadRequest, NotFound } from "../responseHandlers/errorHandlers";

export class UserRepository {
  async getAll(): Promise<IUser[]> {
    return await userModel.find({}, "_id name email photo");
  }

  async create(user: ICreateUserDTO): Promise<string> {
    const { _id } = await userModel.create(user);

    if (!_id) {
      throw new BadRequest("User");
    }

    return _id as unknown as string;
  }

  async deleteById(id: string): Promise<void> {
    await userModel.deleteOne({ id }).exec();
  }

  async updateById(id: string, user: IUpdateUserDTO): Promise<IUser | unknown> {
    return userModel.findByIdAndUpdate({ id }, user).exec();
  }

  async getById(id: string): Promise<IUser> {
    const user = await userModel.findOne({ id }, "_id name email photo");

    return user!;
  }

  async getByEmail(email: string): Promise<IUser> {
    const user = await userModel.findOne(
      { email },
      "_id name email password photo"
    );

    return user!;
  }
}
