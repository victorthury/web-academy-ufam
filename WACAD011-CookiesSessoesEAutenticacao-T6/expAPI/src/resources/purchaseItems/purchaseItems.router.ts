import { Router } from 'express';
import purchaseController from './purchaseItems.controller';

const router = Router();

router.get('/', purchaseController.list);
router.post('/', purchaseController.add);

export default router;
