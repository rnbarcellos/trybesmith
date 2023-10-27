import joi from 'joi';
import { Login } from '../types/Login';

const loginSchema = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
}).messages({
  'any.required': '"username" and "password" are required',
});

type Error = {
  name: string;
  message: string;
  stack?: string;
};

type Validation = {
  error: Error | undefined;
  value: Login | undefined;
};

const validateLogin = (data: Login): Validation => loginSchema.validate(data);

export default {
  validateLogin,
};