import { Request, Response, NextFunction } from 'express';
import httpStatusCodes from '../utils/httpStatusCodes';
import auth from '../auth/jwt';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const { UNAUTHORIZED } = httpStatusCodes;
  if (!authorization) return res.status(UNAUTHORIZED).json({ message: 'Token not found' });

  const token = authorization.split(' ')[1];

  try {
    const decoded = auth.verify(token);
    res.locals = decoded;
    next();
  } catch (error) {
    return res.status(UNAUTHORIZED).json({ message: 'Invalid token' });
  }
};

export default validateToken;