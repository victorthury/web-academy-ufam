import cookieParser from 'cookie-parser';
import { NextFunction, Request, Response } from 'express';
import { LanguageTypes } from '../resources/languages/languages.constants';

function createLanguageCookie() {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!('lang' in req.cookies)) {
      res.cookie('lang', LanguageTypes.ptBr);
    }

    next();
  };
}

export default createLanguageCookie;
