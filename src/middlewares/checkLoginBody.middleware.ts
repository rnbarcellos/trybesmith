import { Request, Response, NextFunction } from 'express';
import login from '../validations/login.validation';

const checkLoginBody = (req: Request, res: Response, next: NextFunction) => {
  const { error } = login.validateLogin(req.body);
  if (error) return res.status(400).json({ message: error.message });
  next();
};

export default checkLoginBody;