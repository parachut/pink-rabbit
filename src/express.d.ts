declare namespace Express {
  export interface Request {
    currentUser: import('./auth').CurrentUser;
  }
}
