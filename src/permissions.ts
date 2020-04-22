import { rule, shield, and, or, not, allow } from 'graphql-shield';
import OktaJwtVerifier from '@okta/jwt-verifier';
import okta from '@okta/okta-sdk-nodejs';
import { Request, Response, NextFunction } from 'express';
import { Context } from './context';

const isAuthenticated = rule({ cache: 'contextual' })(async (parent, args, ctx: Context, info) => {
  console.log(ctx.req.currentUser);
  return ctx.currentUser.id !== 'anon';
});

// Permissions

export const permissions = shield(
  {
    Query: {
      shipments: isAuthenticated,
    },
    Mutation: {
      createOneAddress: allow,
    },
    Address: allow,
  },
  {
    fallbackRule: allow,
    allowExternalErrors: true,
    debug: true,
  },
);
