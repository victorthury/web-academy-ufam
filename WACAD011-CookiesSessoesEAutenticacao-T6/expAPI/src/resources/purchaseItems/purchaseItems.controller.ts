import { Request, Response } from 'express';
import { AddPurchaseItemDTO } from './purchaseItems.types';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import purchaseItemsService from './purchaseItems.service';

const list = (req: Request, res: Response) => {
  /* 
    #swagger.summary = "Lista todos os itens atualmente no carrinho de compras."
    
    #swagger.responses[200] = {
      description: 'Retorna o array de itens do carrinho.',
      schema: {
        type: 'array',
        items: { $ref: '#definitions/AddPurchaseItemDTO' }
      }
    }

    #swagger.responses[500] = {
      description: 'Internal server error'
    }
  */
  res.status(StatusCodes.OK).json(req.session.cart);
};

const add = (req: Request, res: Response) => {
  /*
    #swagger.summary = 'Adiciona um novo item ao carrinho de compras.'
    
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      description: 'Item a ser adicionado ao carrinho.',
      schema: { $ref: '#/definitions/AddPurchaseItemDTO' }
    }

    #swagger.responses[200] = {
      description: 'Item adicionado com sucesso ao carrinho.',
      schema: {
        type: 'string',
        example: 'OK'
      }
    }

    #swagger.responses[500] = {
      description: 'Internal server error'
    }
  */
  const purchaseItem = req.body as AddPurchaseItemDTO;

  req.session.cart = purchaseItemsService.addPurchaseItemToCart(
    req.session.cart,
    purchaseItem
  );
  res.status(StatusCodes.OK).json(ReasonPhrases.OK);
};

export default { add, list };
