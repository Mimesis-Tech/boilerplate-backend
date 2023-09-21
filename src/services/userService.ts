import { ICreateUserDTO, IUser } from "../types/userDTOs";
import { UserRepository } from "../repositories/userRepository";
import {
  BadRequest,
  Conflict,
  NotFound,
} from "../responseHandlers/errorHandlers";
import validator from "validator";
import bcrypt from "bcrypt";
import { config } from "dotenv";
import userModel from "../models/user";
config();

const repository = new UserRepository();

export class UserService {
  async getAll(): Promise<IUser[]> {
    return await repository.getAll();
  }

  async createUser(user: ICreateUserDTO): Promise<IUser> {
    const { name, password, email, photo } = user;

    if (!name) {
      throw new BadRequest("User name not found.");
    }

    if (!password || password.length < 6) {
      throw new BadRequest("User password not found or invalid.");
    }

    if (!validator.isEmail(email)) {
      throw new BadRequest("User email not found.");
    }

    const existEmail = await userModel.findOne({ email: email });

    if (existEmail) {
      throw new Conflict("User");
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

    return await repository.getById(id);
  }

  async getByEmail(email: string): Promise<IUser> {
    const user = await repository.getByEmail(email);
    if (!user) {
      throw new NotFound("User");
    }

    return user;
  }

  async getById(id: string): Promise<IUser> {
    const user = await repository.getById(id);
    if (!user) {
      throw new NotFound("User");
    }

    return user;
  }
}
