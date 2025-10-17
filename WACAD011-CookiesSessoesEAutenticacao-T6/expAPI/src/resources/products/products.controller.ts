import { Request, Response } from 'express';
import { CreateProductDTO } from './products.types';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import productsService from './products.service';

const index = async (req: Request, res: Response) => {
  try {
    const products = await productsService.list();
    res.status(StatusCodes.OK).json({ products });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const read = async (req: Request, res: Response) => {
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
  const id = req.params.id as string;

  try {
    if (!(await productsService.idExists(id))) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: `O produto com id ${id} não foi deletado, pois não existe`,
      });
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
