import jwt from 'jsonwebtoken';
import { Payload } from '../types/Payload';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

const config = {
  expiresIn: '1d',
};

const sign = (payload: Payload): string => jwt.sign(payload, JWT_SECRET, config);

const verify = (token: string): Payload => jwt.verify(token, JWT_SECRET) as Payload;

export default {
  sign,
  verify,
};