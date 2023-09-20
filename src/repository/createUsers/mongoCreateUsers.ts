import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";
import { ICreateUsersParams } from "../../types/ICreateUsersParams";
import { ICreateUserRepository } from "../../types/ICreateUsersRepository";

export class MongoCreateUserRepository implements ICreateUserRepository {
  async createUser(params: ICreateUsersParams): Promise<User> {
    const { insertedId } = await MongoClient.db
      .collection("users")
      .insertOne(params);

    const user = await MongoClient.db
      .collection<Omit<User, "id">>("users")
      .findOne({ _id: insertedId });

    if (!user) {
      throw new Error("User not created");
    }

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
