import Joi from 'joi';
import { LanguageTypes } from './languages.constants';

const languageSchema = Joi.object().keys({
  lang: Joi.string().valid(...Object.values(LanguageTypes)),
});

export default languageSchema;
