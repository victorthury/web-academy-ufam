import { Router } from 'express';
import languagesController from './languages.controller';
import validate from '../../middlewares/validate';
import languageSchema from './languages.schema';

const router = Router();

router.put(
  '/',
  validate(languageSchema),
  languagesController.changeLanguageValue
);

export default router;
