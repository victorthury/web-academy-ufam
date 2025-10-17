import Joi from 'joi';

const schema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  price: Joi.number().greater(0).required(),
  stockQuantity: Joi.number().integer().required(),
});

export default schema;
