import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { httpStatusCodes } from "../responseHandlers/statusCode";

const service = new UserService();

export class UserController {
  async getUsers(req: Request, res: Response) {
    const result = await service.getAll();

    return res.status(httpStatusCodes.OK).json(result);
  }
}
