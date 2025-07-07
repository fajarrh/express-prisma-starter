import { Request } from "express";
import prisma from "@config/db";
import NotFoundException from "@exception/notFound.exception";
import { UserSchema } from "@validation/user.validation";

export const getPaginate = async (qs: Record<string, any>) => {
  const count = await prisma.user.count();
  const results = await prisma.user.findMany({
    take: +(qs.take ?? 10),
    skip: +(qs.skip ?? 0),
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
