import { Router } from 'express';
import usersController from './users.controller';
import validate from '../../middlewares/validate';
import { userSchema } from './users.schema';
import isAdmin from '../../middlewares/isAdmin';
import isAuth from '../../middlewares/isAuth';

const router = Router();

router.get('/', isAuth, usersController.index);
router.get('/:id', isAuth, usersController.read);
router.post('/', isAuth, isAdmin, validate(userSchema), usersController.create);
router.put(
  '/:id',
  isAuth,
  isAdmin,
  validate(userSchema),
  usersController.update
);
router.delete(
  '/:id',
  isAuth,
  isAdmin,
  validate(userSchema),
  usersController.remove
);

export default router;
