import { Controller, Post } from "frexp/lib/Decorator";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

@Controller("/auth")
export class AuthController {
  @Post("/login")
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      res.json({});
    } catch (error) {
      next(error);
    }
  }
}
