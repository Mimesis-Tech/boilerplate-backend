import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { httpStatusCodes } from "../responseHandlers/statusCode";
import { ICreateUserDTO, IUpdateUserDTO } from "../types/userDTOs";

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

  async updateUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user: IUpdateUserDTO = req.body;

      const result = await service.updateById(id, user);

      return res.status(httpStatusCodes.OK).json(result);
    } catch (error: any) {
      return res
        .status(error.status ?? httpStatusCodes.BAD_REQUEST)
        .json(error.message ?? error);
    }
  }

  async deleteUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const result = await service.deleteById(id);

      return res.status(httpStatusCodes.OK).json(result);
    } catch (error: any) {
      return res
        .status(error.status ?? httpStatusCodes.BAD_REQUEST)
        .json(error.message ?? error);
    }
  }

  async getUserByEmail(req: Request, res: Response) {
    try {
      const { email } = req.params;

      const result = await service.getByEmail(email);

      return res.status(httpStatusCodes.OK).json(result);
    } catch (error: any) {
      return res
        .status(error.status ?? httpStatusCodes.NOT_FOUND)
        .json(error.message ?? error);
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const result = await service.getById(id);

      return res.status(httpStatusCodes.OK).json(result);
    } catch (error: any) {
      return res
        .status(error.status ?? httpStatusCodes.NOT_FOUND)
        .json(error.message ?? error);
    }
  }
}
