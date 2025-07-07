
import { NextFunction, Request, Response } from "express";
import { Controller, Get, Post, Put, Delete } from "frexp/lib/Decorator";
import { getPaginate, getDetail, handleCreate, handleUpdate, handleDelete} from "@service/user.service";
import UserResource from "@resource/user.resource";
import { userSchema } from "@validation/user.validation";

@Controller("/user")
export class UserController {

  @Get("/")
  async index(req: Request, res: Response, next: NextFunction){
    try {
      const results = await getPaginate(req.query);
      res.json(UserResource.paginate(results));
    } catch (error) {
      next(error);
    }
  };

  @Get("/:id")
  async view(req: Request, res: Response, next: NextFunction){
    try {
      const model = await getDetail(+req.params.id)
      res.json(new UserResource(model, true));
    } catch (error) {
      next(error);
    }
  };

  @Post("/")
  async create(req: Request, res: Response, next: NextFunction){
    try {
      
  const validated = await req.validation(userSchema);
 
      const model = await handleCreate(validated);
      res.json(new UserResource(model, true));
    } catch (error) {
      next(error);
    }
  };

  @Put("/")
  async update(req: Request, res: Response, next: NextFunction){
    try {
      
    const validated = await req.validation(userSchema, {
      context: { method: req.method },
    });
   
      const model = await handleUpdate(validated);
      res.json(new UserResource(model, true));
    } catch (error) {
      next(error);
    }
  };

  @Delete("/:id")
  async destroy(req: Request, res: Response, next: NextFunction){
    try {
      await handleDelete(+req.params.id)
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };
}
