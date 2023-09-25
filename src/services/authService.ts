import { AuthRepository } from "../repositories/authRepository";
import { NotAuthorizedd, NotFound } from "../responseHandlers/errorHandlers";
import bcrypt from "bcrypt";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
config();

const repository = new AuthRepository();

export class AuthService {
  async login(email: string, password: string): Promise<string> {
    const existUser = await repository.login(email);

    if (!existUser) {
      throw new NotFound("User");
    }

    const checkPassword = await bcrypt.compare(
      password,
      existUser.password as string
    );

    if (!checkPassword) {
      throw new NotAuthorizedd();
    }

    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(
      {
        id: existUser.id,
      },
      secretKey!,
      { expiresIn: "1d" }
    );

    return token;
  }
}
