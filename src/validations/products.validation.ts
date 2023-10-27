import joi from 'joi';
import { Validation } from '../types/Validation';

const productSchema = joi.object({
  name: joi.string().min(3).required(),
  price: joi.string().min(3).required(),
  orderId: joi.number().required(),
});

type ProductBody = {
  name: string;
  price: string;
  orderId: number;
};

const validateProduct = (data: ProductBody): Validation => productSchema.validate(data);

export default {
  validateProduct,
};