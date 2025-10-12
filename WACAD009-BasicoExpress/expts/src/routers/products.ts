import { Router } from 'express';
import productsController from '../controllers/products';

const router = Router();

router.get('/products', productsController.index);
router.all('/products/create', productsController.create);
router.get('/products/read/:id', productsController.read);
router.all('/products/update/:id', productsController.update);
router.post('/products/:id', productsController.remove);

export default router;
