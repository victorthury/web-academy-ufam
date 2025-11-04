import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

function isAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session.uid) {
    res.status(StatusCodes.FORBIDDEN).json(ReasonPhrases.FORBIDDEN);
  } else {
    next();
  }
}

export default isAuth;
