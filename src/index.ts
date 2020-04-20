require('dotenv').config();

import bodyParser from 'body-parser';
import express from 'express';
import { createGraphqlMiddleware } from 'express-gql';
import expressPlayground from 'graphql-playground-middleware-express';
import { PrismaClient } from '@prisma/client';
import { applyMiddleware } from 'graphql-middleware';

import { authMiddleware } from './auth';
import { schema } from './schema';
import { permissions } from './permissions';
import { createContext } from './context';

const app = express();
const prisma = new PrismaClient();

app.use(authMiddleware);

app.post(
  '/graphql',
  bodyParser.json(),
  createGraphqlMiddleware({
    context: createContext,
    formatError: ({ req, error }) => error,
    schema: applyMiddleware(schema, permissions),
  }),
);

app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

app.listen(Number(process.env.PORT) || 4000);
