import { Router } from 'express';
import isAuth from '../../middlewares/isAuth';
import purchaseController from './purchase.controller';

const router = Router();

router.post('/', isAuth, purchaseController.purchase);

export default router;
