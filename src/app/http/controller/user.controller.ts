
import { NextFunction, Request, Response } from "express";
import { Controller, Get, Post, Put, Delete } from "frexp/lib/Decorator";
import { getPaginate, getDetail, handleCreate, handleUpdate, handleDelete} from "@service/user.service";
import UserResource from "@resource/user.resource";
import { createUserSchema,updateUserSchema } from "@validation/user.validation";

@Controller("/user")
export class UserController {

  @Get("/")
  async getIndex(req: Request, res: Response, next: NextFunction){
    try {
      const results = await getPaginate(req.query);
      res.json(UserResource.paginate(results));
    } catch (error) {
      next(error);
    }
  };

  @Get("/:id")
  async getView(req: Request, res: Response, next: NextFunction){
    try {
      const model = await getDetail(+req.params.id)
      res.json(new UserResource(model, true));
    } catch (error) {
      next(error);
    }
  };

  @Post("/")
  async postCreate(req: Request, res: Response, next: NextFunction){
    try {
      
  const validated = await req.validation(createUserSchema);
 
      const model = await handleCreate(validated);
      res.json(new UserResource(model, true));
    } catch (error) {
      next(error);
    }
  };

  @Put("/")
  async putUser(req: Request, res: Response, next: NextFunction){
    try {
      
    const validated = await req.validation(updateUserSchema);
   
      const model = await handleUpdate(validated);
      res.json(new UserResource(model, true));
    } catch (error) {
      next(error);
    }
  };

  @Delete("/:id")
  async deleteUser(req: Request, res: Response, next: NextFunction){
    try {
      await handleDelete(+req.params.id)
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };
}
