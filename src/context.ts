import { PrismaClient } from '@prisma/client';
import { Request } from 'express';

const prisma = new PrismaClient();

export type Context = {
  prisma: PrismaClient;
  currentUser: any;
  req: Request;
};

export const createContext = ({ req }: { req: Request }): Context => ({
  prisma,
  req,
  currentUser: req.currentUser,
});
