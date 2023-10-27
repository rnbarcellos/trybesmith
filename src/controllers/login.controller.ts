import { Request, Response } from 'express';
import loginService from '../services/login.service';

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const response = await loginService.login({ username, password });
  res.status(response.status).json(response.data);
};

export default {
  login,
};