require('dotenv').config();

import bodyParser from 'body-parser';
import express from 'express';
import { createGraphqlMiddleware } from 'express-gql';
import expressPlayground from 'graphql-playground-middleware-express';

import { authMiddleware } from './auth';
import { schema } from './schema';

const app = express();

app.use(authMiddleware);

app.post(
  '/graphql',
  bodyParser.json(),
  createGraphqlMiddleware({
    context: ({ req, res }) => ({
      req,
    }),
    formatError: ({ req, error }) => {
      console.log(error);
      return error;
    },
    schema,
  }),
);

app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

app.listen(Number(process.env.PORT) || 4000);
