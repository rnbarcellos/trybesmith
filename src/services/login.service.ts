import bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';
import auth from '../auth/jwt';
import httpStatusCodes from '../utils/httpStatusCodes';
import { Login } from '../types/Login';
import { ServiceResponse } from '../types/ServiceResponse';
import { Token } from '../types/Token';
import { Message } from '../types/Message';

const userOrPasswordNotFound = {
  status: httpStatusCodes.UNAUTHORIZED,
  data: { message: 'Username or password invalid' },
};

const login = async (data: Login): Promise<ServiceResponse<Token | Message>> => {
  const user = await UserModel.findOne({ where: { username: data.username } });
  if (!user) return userOrPasswordNotFound;

  const isPasswordValid = await bcrypt.compare(data.password, user.dataValues.password);
  if (!isPasswordValid) return userOrPasswordNotFound;

  const payload = {
    id: user.dataValues.id, username: user.dataValues.username,
  };
  const token = auth.sign(payload);

  return {
    status: httpStatusCodes.OK,
    data: { token },
  };
};

export default {
  login,
};