import { rule, shield, and, or, not, allow } from 'graphql-shield';
import OktaJwtVerifier from '@okta/jwt-verifier';
import okta from '@okta/okta-sdk-nodejs';
import { Request, Response, NextFunction } from 'express';
import { Context } from './context';

const isAuthenticated = rule({ cache: 'contextual' })(async (parent, args, ctx: Context, info) => {
  return ctx.currentUser.id !== 'anon';
});

const isAddressOwner = rule({ cache: 'contextual' })(async (parent, args, ctx: Context, info) => {
  const result = await ctx.prisma.address.count({
    where: {
      userId: ctx.currentUser.id,
      id: args.where.id,
    },
  });

  return !!result;
});

// Permissions

export const permissions = shield(
  {
    Query: {
      shipments: isAuthenticated,
    },
    Mutation: {
      createOneAddress: allow,
      deleteOneAddress: and(isAuthenticated, isAddressOwner),
    },
    Address: allow,
  },
  {
    fallbackRule: allow,
    allowExternalErrors: true,
    debug: true,
  },
);
