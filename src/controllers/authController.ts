import { Request, Response } from "express";
import { AuthService } from "../services/authService";
import { httpStatusCodes } from "../responseHandlers/statusCode";

const service = new AuthService();

export class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { email, password }: { email: string; password: string } = req.body;

      const result = await service.login(email, password);

      return res.status(httpStatusCodes.OK).json(result);
    } catch (error: any) {
      return res
        .status(error.status ?? httpStatusCodes.NOT_AUTHORIZED)
        .json(error.message ?? error);
    }
  }
}
