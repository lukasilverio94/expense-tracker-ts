import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/authService.js";

export class AuthController {
  private authService = new AuthService();

  handleRegisterUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { username, password } = req.body;
      const user = await this.authService.register(username, password);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  };

  handleLoginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;
      const token = await this.authService.login(username, password);
      res.json({ token });
    } catch (error) {
      next(error);
    }
  };
}
