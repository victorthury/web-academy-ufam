import { Request, Response } from 'express';
import { createPurchase } from './purchase.service';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

const purchase = async (req: Request, res: Response) => {
  /* 
    #swagger.summary = "Finaliza a compra dos itens presentes no carrinho."

    #swagger.responses[200] = {
      description: 'Compra realizada com sucesso.'
    }

    #swagger.responses[422] = {
      description: 'Não é possível finalizar a compra pois o carrinho está vazio.'
    }

    #swagger.responses[500] = {
      description: 'Internal server error'
    }
  */
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
