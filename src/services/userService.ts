import { ICreateUserDTO, IUpdateUserDTO, IUser } from "../types/userDTOs";
import { UserRepository } from "../repositories/userRepository";
import {
  BadRequest,
  Conflict,
  NotAuthorizedd,
  NotFound,
} from "../responseHandlers/errorHandlers";
import validator from "validator";
import bcrypt from "bcrypt";
import { config } from "dotenv";
import userModel from "../models/user";
import jwt from "jsonwebtoken";
config();

const repository = new UserRepository();

export class UserService {
  async getAll(): Promise<IUser[]> {
    return await repository.getAll();
  }

  async create(user: ICreateUserDTO): Promise<IUser> {
    const { name, password, email, photo } = user;

    if (!name) {
      throw new BadRequest("User name not found.");
    }

    if (!password || password.length < 8) {
      throw new BadRequest("User password not found or invalid.");
    }

    if (!validator.isEmail(email)) {
      throw new BadRequest("User email invalid.");
    }

    const existUser = await repository.getByEmail(email);

    if (existUser) {
      throw new Conflict("User");
    }

    const saltRounds = parseInt(process.env.SALT_ROUNDS!);
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const wasCreated = {
      name,
      email,
      password: hashedPassword,
      photo,
    };

    const _id = await repository.create(wasCreated);

    return await repository.getById(_id);
  }

  async updateById(_id: string, user: IUpdateUserDTO): Promise<IUser> {
    const wasUpdated = await repository.getById(_id);

    if (!wasUpdated) {
      throw new NotFound("User");
    }

    const { email } = user;

    if (!validator.isEmail(email as string)) {
      throw new BadRequest("User email invalid.");
    }

    const isYourEmail = wasUpdated.email === user.email;

    if (!isYourEmail) {
      const existEmail = await userModel.findOne({ email: email });

      if (existEmail) {
        throw new Conflict("User");
      }
    }

    await repository.updateById(_id, user);

    return await repository.getById(_id);
  }

  async deleteById(_id: string): Promise<IUser> {
    const wasDeleted = await repository.getById(_id);

    if (!wasDeleted) {
      throw new NotFound("User");
    }

    await repository.deleteById(_id);

    return wasDeleted;
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
      console.log("eRRO ID");
      throw new NotFound("User");
    }

    return user;
  }
}
