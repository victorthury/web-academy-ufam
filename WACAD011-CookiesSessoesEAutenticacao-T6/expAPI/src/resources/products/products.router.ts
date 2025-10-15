import { Router } from 'express';
import productsController from './products.controller';

const router = Router();

router.get('/', productsController.index);
router.get('/:id', productsController.read);
router.post('/', productsController.create);
router.put('/:id', productsController.update);
router.delete('/:id', productsController.remove);

export default router;
