import productsRouter from '../resources/products/products.router';
import { Router } from 'express';

const router = Router();

router.use('/products', productsRouter);

export default router;
