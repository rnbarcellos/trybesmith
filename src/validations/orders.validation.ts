import joi from 'joi';
import { Validation } from '../types/Validation';
import { OrderBody } from '../types/OrderBody';

// personlized message "\"productIds\" must include only numbers"
const orderSchema = joi.object({
  userId: joi.number().strict().required(),
  productIds: joi.array().items(joi.number().strict().required()).required(),
}).messages({
  'any.required': '{#label} is required',
  'number.base': '{#label} must be a number',
  'array.base': '{#label} must be an array',
  'array.includesRequiredUnknowns': '{#label} must include only numbers',
});

const validateOrder = (order: OrderBody): Validation => orderSchema.validate(order);

export default {
  validateOrder,
};