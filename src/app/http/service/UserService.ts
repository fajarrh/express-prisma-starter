import { Request } from "express";
import prisma from "@config/db";
import NotFoundException from "@exception/NotFoundException";
import { UserSchema } from "@validation/UserValidation";

export const getPaginate = async (req: Request) => {
  const count = await prisma.user.count();
  const results = await prisma.user.findMany({
    take: +req.getQuery("perPage", 10),
    skip: +req.getQuery("page", 0),
  });
  return { total: count, data: results };
};

export const getDetail = async (id: number) => {
  const model = await prisma.user.findFirst({ where: { id } });
  if (!model) {
    throw new NotFoundException("User");
  }
  return model;
};

export const handleCreate = (payload: UserSchema) => {
  return prisma.user.create({ data: payload });
};

export const handleUpdate = ({ id, ...payload }: UserSchema) => {
  return prisma.user.update({ where: { id: +id! }, data: payload });
};

export const handleDelete = (id: number) => {
  return prisma.user.delete({ where: { id } });
};
