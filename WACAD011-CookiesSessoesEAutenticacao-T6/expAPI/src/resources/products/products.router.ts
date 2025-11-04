import { Router } from 'express';
import productsController from './products.controller';
import validate from '../../middlewares/validate';
import schema from './product.schema';
import isAdmin from '../../middlewares/isAdmin';
import isAuth from '../../middlewares/isAuth';

const router = Router();

router.get('/', isAuth, productsController.index);
router.get('/:id', isAuth, productsController.read);
router.post('/', isAuth, isAdmin, validate(schema), productsController.create);
router.put(
  '/:id',
  isAuth,
  isAdmin,
  validate(schema),
  productsController.update
);
router.delete('/:id', isAuth, isAdmin, productsController.remove);

export default router;
