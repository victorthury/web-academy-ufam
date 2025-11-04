import productsRouter from '../resources/products/products.router';
import languageRouter from '../resources/languages/languages.router';
import authRouter from '../resources/auth/auth.router';
import usersRouter from '../resources/users/users.router';
import purchaseItemsRouter from '../resources/purchaseItems/purchaseItems.router';
import purchaseRouter from '../resources/purchases/purchase.router';
import { Router } from 'express';

const router = Router();

router.use(
  '/products',
  // #swagger.tags = ['Product']
  productsRouter
);
router.use(
  '/language',
  // #swagger.tags = ['Language']
  languageRouter
);
router.use(
  '/users',
  // #swagger.tags = ['Users']
  usersRouter
);
router.use(
  '/auth',
  // #swagger.tags = ['Auth']
  authRouter
);

router.use(
  '/cart',
  // #swagger.tags = ['Cart']
  purchaseItemsRouter
);
router.use(
  '/purchases',
  // #swagger.tags = ['Purchase']
  purchaseRouter
);

export default router;
