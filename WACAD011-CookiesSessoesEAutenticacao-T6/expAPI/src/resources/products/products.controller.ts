import { Request, Response } from 'express';
import productsService from './products.service';
import { CreateProductDTO } from './products.types';

const index = (req: Request, res: Response) => {
  const products = productsService.list();

  res.status(200).json({ products });
};

const read = (req: Request, res: Response) => {
  const id = req.params.id as string;
  const product = productsService.get(parseInt(id));

  if (!product) {
    res.status(404).json({ message: `O produto com id ${id} não existe` });
  }

  res.status(200).json({ product });
};

const create = (req: Request, res: Response) => {
  const product = req.body as CreateProductDTO;

  const productCreate = productsService.create(product);

  res.json(productCreate);
};

const update = (req: Request, res: Response) => {
  const id = req.params.id as string;
  const product = req.body as CreateProductDTO;

  const productUpdate = productsService.update(parseInt(id), product);

  if (!productUpdate) {
    res.status(404).json({ message: `O produto com id ${id} não existe` });
  }
  res.status(200).json({ product });
};

const remove = (req: Request, res: Response) => {
  const id = req.params.id as string;
  const isDeleted = productsService.remove(parseInt(id));

  if (!isDeleted) {
    res.status(404).json({
      message: `O produto com id ${id} não foi deletado, pois não existe`,
    });
  }
  res
    .status(200)
    .json({ message: `O produto com id ${id} foi deletado com sucesso` });
};

export default { index, read, create, update, remove };
