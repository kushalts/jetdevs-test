import { Joi } from 'celebrate';

const ProductSchema = {
  body: {
    name: Joi.string().required(),
    price: Joi.number().required(),
  },
};

export default {
  ProductSchema,
};
