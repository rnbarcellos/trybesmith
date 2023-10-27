import joi from 'joi';
import { Login } from '../types/Login';
import { Validation } from '../types/Validation';

const loginSchema = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
}).messages({
  'any.required': '"username" and "password" are required',
});

const validateLogin = (data: Login): Validation => loginSchema.validate(data);

export default {
  validateLogin,
};