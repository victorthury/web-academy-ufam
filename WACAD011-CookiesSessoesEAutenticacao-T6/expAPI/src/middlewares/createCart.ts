import { NextFunction, Request, Response } from 'express';

function createCart() {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.cart) req.session.cart = [];
    next();
  };
}

export default createCart;
