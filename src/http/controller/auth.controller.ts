import { Controller, Post } from "frexp/lib/Decorator";
import { NextFunction, Request, Response } from "express";
import { handleLogin, handleRegister } from "@service/auth.service";
import { loginSchema, registerSchema } from "@validation/auth.validation";
import SigninResource from "@resource/signin.resource";
@Controller("")
export class AuthController {
  @Post("/login")
  async postLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = await req.validation(loginSchema);
      const result = await handleLogin(validated);
      res.json(new SigninResource(result, true));
    } catch (error) {
      next(error);
    }
  }

  @Post("/register")
  async postRegister(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = await req.validation(registerSchema);
      await handleRegister(validated);
      res.json({
        data: {
          message: "success",
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
