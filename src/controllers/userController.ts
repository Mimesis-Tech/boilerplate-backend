import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { httpStatusCodes } from "../responseHandlers/statusCode";
import { ICreateUserDTO } from "../types/userDTOs";

const service = new UserService();

export class UserController {
  async getUsers(req: Request, res: Response) {
    const result = await service.getAll();

    return res.status(httpStatusCodes.OK).json(result);
  }

  async createUser(req: Request, res: Response) {
    try {
      const user: ICreateUserDTO = req.body;

      const result = await service.createUser(user);

      return res.status(httpStatusCodes.CREATED).json(result);
    } catch (error: any) {
      return res
        .status(error.status ?? httpStatusCodes.BAD_REQUEST)
        .json(error.message ?? error);
    }
  }
}
