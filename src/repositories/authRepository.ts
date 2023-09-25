import userModel from "../models/user";
import { NotFound } from "../responseHandlers/errorHandlers";

export class AuthRepository {
  async login(email: string) {
    const user = await userModel
      .findOne({ email }, "_id name email password photo")
      .exec();

    if (!user) {
      throw new NotFound("User");
    }

    return user;
  }
}
