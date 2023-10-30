import { Request, Response, NextFunction } from 'express';
import httpStatusCodes from '../utils/httpStatusCodes';
import order from '../validations/orders.validation';

const checkOrderBody = (req: Request, res: Response, next: NextFunction) => {
  const { error } = order.validateOrder(req.body);
  const statusCode = error?.message.includes('required') 
    ? httpStatusCodes.BAD_REQUEST : httpStatusCodes.UNPROCESSABLE_ENTITY;

  if (error) return res.status(statusCode).json({ message: error.message });

  next();
};

export default checkOrderBody;