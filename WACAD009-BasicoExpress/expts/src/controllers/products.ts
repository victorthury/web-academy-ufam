import { Request, Response } from 'express';
import axios from 'axios';
import { Product } from '../types/products';

axios.defaults.baseURL = 'http://localhost:8000';

async function index(req: Request, res: Response) {
  try {
    const products = (await axios.get('/products')).data;
    res.render('products/index', { products });
  } catch (error) {
    res.statusCode = 500;
    res.send(error);
  }
}

async function create(req: Request, res: Response) {
  try {
    if (req.method === 'GET') {
      res.render('products/create');
    } else if (req.method === 'POST') {
      const product: Product = req.body;
      await axios.post('/products', product);
      res.redirect('/products');
    }
  } catch (error) {
    res.statusCode = 500;
    res.send(error);
  }
}

async function read(req: Request, res: Response) {
  const { id } = req.params;
  const product: Product = (await axios(`/products/${id}`)).data;

  res.render('products/read', { product });
}

async function update(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (req.method === 'GET') {
      const product: Product = (await axios(`/products/${id}`)).data;
      res.render('products/update', { product });
    } else if (req.method === 'POST') {
      const product: Product = req.body;
      await axios.put(`/products/${id}`, product);
      res.redirect('/products');
    }
  } catch (error) {
    res.statusCode = 500;
    res.send(error);
  }
}

async function remove(req: Request, res: Response) {
  try {
    const { id } = req.params;
    axios.delete(`/products/${id}`);
    const products = (await axios.get('/products')).data;
    res.render('products/index', { products });
  } catch (error) {
    res.statusCode = 500;
    res.send(error);
  }
}

export default { index, create, read, update, remove };
