import { Request, Response } from 'express';
import { AddPurchaseItemDTO } from './purchaseItems.types';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import purchaseItemsService from './purchaseItems.service';

const list = (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json(req.session.cart);
};

const add = (req: Request, res: Response) => {
  const purchaseItem = req.body as AddPurchaseItemDTO;

  req.session.cart = purchaseItemsService.addPurchaseItemToCart(
    req.session.cart,
    purchaseItem
  );
  res.status(StatusCodes.OK).json(ReasonPhrases.OK);
};

export default { add, list };
