import OktaJwtVerifier from '@okta/jwt-verifier';
import okta from '@okta/okta-sdk-nodejs';
import { Request, Response, NextFunction } from 'express';

export interface IUser {
  id: string;
  name: string;
}

export const defaultUser: IUser = {
  id: 'anon',
  name: 'Anonymous',
};

export const jwtVerifier = new OktaJwtVerifier({
  clientId: process.env.OKTA_CLIENT_ID,
  issuer: `${process.env.OKTA_ORG_URL}/oauth2/default`,
});

export const oktaClient = new okta.Client({
  orgUrl: process.env.OKTA_ORG_URL,
  token: process.env.OKTA_TOKEN,
});

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.header('authorization');

  if (!authorization) {
    req.user = defaultUser;
    next();
  } else {
    const [authType, token] = authorization.trim().split(' ');

    if (token) {
      const {
        claims: { sub },
      } = await jwtVerifier.verifyAccessToken(token);

      req.user = await oktaClient.getUser(sub);

      next();
    }
  }
};
