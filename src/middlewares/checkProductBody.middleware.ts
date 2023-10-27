import { NextFunction, Request, Response } from 'express';
import product from '../validations/products.validation';
import httpStatusCodes from '../utils/httpStatusCodes';

const checkProductBody = (req: Request, res: Response, next: NextFunction) => {
  const { error } = product.validateProduct(req.body);
  const statusCode = error?.message.includes('required') 
    ? httpStatusCodes.BAD_REQUEST : httpStatusCodes.UNPROCESSABLE_ENTITY;

  if (error) {
    return res.status(statusCode).json({ message: error.message });
  }
  next();
};

export default checkProductBody;