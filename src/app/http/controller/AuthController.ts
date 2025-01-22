import { Controller, Get, Middleware, Post } from "frexp/lib/Decorator";
import { NextFunction, Request, Response } from "express";
import { login } from "@service/AuthService";
import AuthMiddleware from "@middleware/AuthMiddleware";

const arr = [100];

@Controller("")
export class AuthController {
  @Post("/login")
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const token = await login();
      res.json({ data: token });
    } catch (error) {
      next(error);
    }
  }

  @Get("/test")
  async testing(req: Request, res: Response, next: NextFunction) {
    try {
      const pop = arr.pop();
      res.json({
        data: {
          id: req.id,
          pop: pop,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
