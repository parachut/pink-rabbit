import OktaJwtVerifier from '@okta/jwt-verifier';
import okta from '@okta/okta-sdk-nodejs';
import { Request, Response, NextFunction } from 'express';

export interface CurrentUser {
  id: string;
  name: string;
}

export const defaultUser: CurrentUser = {
  id: 'anon',
  name: 'Anonymous',
};

export const jwtVerifier = new OktaJwtVerifier({
  clientId: process.env.OKTA_CLIENT_ID,
  issuer: `${process.env.OKTA_ORG_URL}/oauth2/default`,
  scopes: ['openid', 'profile'],
  assertClaims: {
    aud: 'api://default',
  },
});

export const oktaClient = new okta.Client({
  orgUrl: process.env.OKTA_ORG_URL,
  token: process.env.OKTA_TOKEN,
});

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.header('authorization');

  if (!authorization) {
    req.currentUser = defaultUser;
    next();
  } else {
    const [authType, token] = authorization.trim().split(' ');

    console.log(token);

    if (token) {
      const {
        claims: { sub },
      } = await jwtVerifier.verifyAccessToken(token, 'api://default');

      console.log(sub);

      try {
        req.currentUser = await oktaClient.getUser(sub);
      } catch (e) {
        console.log(e);
        req.currentUser = defaultUser;
      }

      next();
    }
  }
};
