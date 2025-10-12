import { Router } from 'express';
import controller from '../controllers/main';

const router = Router();

router.get('/', controller.index);

router.get('/about', controller.about);

router.get('/lorem/:paragraphs', controller.lorem);

router.get('/hb1', controller.hb1);

router.get('/hb2', controller.hb2);

router.get('/hb3', controller.hb3);

router.get('/hb4', controller.hb4);

export default router;
