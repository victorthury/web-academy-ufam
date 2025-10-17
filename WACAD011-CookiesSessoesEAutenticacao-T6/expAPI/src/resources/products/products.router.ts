import { Router } from 'express';
import productsController from './products.controller';
import validate from '../../middlewares/validate';
import schema from './product.schema';

const router = Router();

router.get('/', productsController.index);
router.get('/:id', productsController.read);
router.post('/', validate(schema), productsController.create);
router.put('/:id', validate(schema), productsController.update);
router.delete('/:id', productsController.remove);

export default router;
