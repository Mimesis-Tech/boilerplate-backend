import { ICreateUserDTO, IUser } from "../types/userDTOs";
import { UserRepository } from "../repositories/userRepository";
import { NotFound } from "../responseHandlers/errorHandlers";
import validator from "validator";
import bcrypt from "bcrypt";
import { config } from "dotenv";
import userModel from "../models/user";
config();

const repository = new UserRepository();

export class UserService {
  async getAll(): Promise<IUser[]> {
    return repository.getAll();
  }

  async createUser(user: ICreateUserDTO): Promise<IUser> {
    const { name, password, email, photo } = user;

    if (!name) {
      throw new NotFound("User");
    }

    if (!password || password.length < 6) {
      throw new NotFound("User");
    }

    if (!validator.isEmail(email)) {
      throw new NotFound("User");
    }

    const existEmail = await userModel.findOne({ email: email });

    if (existEmail) {
      throw new NotFound("User");
    }

    const saltRounds = parseInt(process.env.SALT_ROUNDS!);
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const createdUser = {
      name,
      email,
      password: hashedPassword,
      photo,
    };

    const id = await repository.create(createdUser);

    return repository.getById(id);
  }
}
