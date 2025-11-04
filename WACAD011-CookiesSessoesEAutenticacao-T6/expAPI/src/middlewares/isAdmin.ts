import { NextFunction, Request, Response } from 'express';
import { UserTypes } from '../resources/userTypes/userTypes.constants';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.session.userTypeId !== UserTypes.admin) {
    res.status(StatusCodes.FORBIDDEN).json(ReasonPhrases.FORBIDDEN);
  } else {
    next();
  }
}

export default isAdmin;
