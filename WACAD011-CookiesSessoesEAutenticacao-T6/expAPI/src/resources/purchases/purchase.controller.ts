import { Request, Response } from 'express';
import { createPurchase } from './purchase.service';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

const purchase = async (req: Request, res: Response) => {
  try {
    if (!req.session?.cart?.length) {
      res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json(ReasonPhrases.UNPROCESSABLE_ENTITY);
    } else {
      await createPurchase(req.session.uid, req.session.cart);
      req.session.cart = [];
      res.status(StatusCodes.OK).json(ReasonPhrases.OK);
    }
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};

export default { purchase };
