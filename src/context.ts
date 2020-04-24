import { PrismaClient } from '@prisma/client';
import { Request } from 'express';

import { CurrentUser } from './auth';

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  currentUser: CurrentUser;
  req: Request;
}

export const createContext = ({ req }: { req: Request }): Context => ({
  prisma,
  req,
  currentUser: req.currentUser,
});
