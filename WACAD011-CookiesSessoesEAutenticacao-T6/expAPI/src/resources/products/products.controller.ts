import { Request, Response } from 'express';
import { CreateProductDTO } from './products.types';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import productsService from './products.service';

const index = async (req: Request, res: Response) => {
  /* 
    #swagger.summary = "Lista todos os produtos do banco de dados."
    
    #swagger.responses[200] = {
      description: 'Retorna um array de produtos',
      schema: {
        type: 'array',
        items: {
          $ref: '#definitions/Product'
        } 
      }
    }

    #swagger.responses[500] = {
      description: 'Internal server error'
    }
  */

  try {
    const products = await productsService.list();
    res.status(StatusCodes.OK).json({ products });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const read = async (req: Request, res: Response) => {
  /*
    #swagger.summary = "Lê um produto cadastrado no banco de dados."
    #swagger.parameters['id'] = {
      description: "O id de um produto cadastrado no banco de dados"
    }

    #swagger.responses[200] = {
      description: "Retorno do produto",
      schema: { $ref: '#definitions/Product' }
    }

    #swagger.responses[404] = {
      description: 'O produto não existe no bancos de dados'
    }

    #swagger.responses[500] = {
      description: 'Internal server error'
    }
  */
  const id = req.params.id as string;

  try {
    const product = await productsService.getById(id);

    if (!product) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `O produto com id ${id} não existe` });
      return;
    }

    res.status(StatusCodes.OK).json({ product });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const create = async (req: Request, res: Response) => {
  /*
    #swagger.summary = 'Cria um novo produto no banco de dados.'
    #swagger.parameters['body'] = {
      in: 'body',
      schema: { $ref: '#/definitions/CreateProductDTO' }
    } 
    #swagger.responses[201] = {
      description: 'O produto foi criado com sucesso no banco de dados.',
      schema: { $ref: '#definitions/Product' }
    }
    
    #swagger.responses[409] = {
      description: 'O produto já existe no banco de dados.'
    }

    #swagger.responses[500] = {
      description: 'Internal server error'
    }
  */

  const product = req.body as CreateProductDTO;

  try {
    if (await productsService.nameAlreadyExists(product.name)) {
      res.status(StatusCodes.CONFLICT).send(ReasonPhrases.CONFLICT);
      return;
    }
    const newProduct = await productsService.create(product);
    res.status(StatusCodes.CREATED).json(newProduct);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const update = async (req: Request, res: Response) => {
  /*
    #swagger.summary = 'Cria um novo produto no banco de dados.'

    #swagger.parameters['id'] = {
      description: 'Id do produto'
    }
    #swagger.parameters['body'] = {
      in: 'body',
      schema: { $ref: '#/definitions/CreateProductDTO' }
    } 
    #swagger.responses[201] = {
      description: 'O produto foi criado com sucesso no banco de dados.',
      schema: { $ref: '#definitions/Product' }
    }
    
    #swagger.responses[409] = {
      description: 'O produto já existe no banco de dados.'
    }

    #swagger.responses[500] = {
      description: 'Internal server error'
    }
  */

  const id = req.params.id as string;
  const product = req.body as CreateProductDTO;

  try {
    if (!(await productsService.idExists(id))) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `O produto com id ${id} não existe` });
      return;
    }

    const productUpdate = await productsService.update(id, product);

    res.status(StatusCodes.OK).json({ product: productUpdate });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const remove = async (req: Request, res: Response) => {
  /* 
    #swagger.summary = "Remove produto dado id do banco de dados."
    
    #swagger.parameters['id'] = {
      description: 'Id do produto'
    }

    #swagger.responses[200] = {
      description: 'Retorna se o produto foi removido ou não',
      schema: { message: "O produto com id 84afdc12-aca3-4844-ae86-5b7a0349d29a foi deletado com sucesso" }
    }

    #swagger.responses[500] = {
      description: 'Internal server error'
    }
  */

  const id = req.params.id as string;

  try {
    if (!(await productsService.idExists(id))) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: `O produto com id ${id} não foi deletado, pois não existe`
      });
      return;
    }

    await productsService.remove(id);

    res
      .status(StatusCodes.OK)
      .json({ message: `O produto com id ${id} foi deletado com sucesso` });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

export default { index, read, create, update, remove };
