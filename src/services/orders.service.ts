import { Sequelize } from 'sequelize';
import OrderModel, { OrderSequelizeModel } from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import UserModel from '../database/models/user.model';
import httpStatusCodes from '../utils/httpStatusCodes';
import { ServiceResponse } from '../types/ServiceResponse';
import { OrderBody } from '../types/OrderBody';
import { Message } from '../types/Message';

const userNotFound = {
  status: httpStatusCodes.NOT_FOUND,
  data: {
    message: '"userId" not found',
  },
};

const getAllOrders = async (): Promise<ServiceResponse<OrderSequelizeModel[]>> => {
  const orders = await OrderModel.findAll({ include: {
    model: ProductModel,
    as: 'productIds',
    attributes: [],
  },
  raw: true,
  attributes: [
    'id',
    'userId',
    [Sequelize.fn('JSON_ARRAYAGG', Sequelize.col('productIds.id')), 'productIds'],
  ],
  group: ['id'],
  });

  return {
    status: httpStatusCodes.OK,
    data: orders,
  };
};

const createOrder = async (productIds: number[], userId: number):
Promise<ServiceResponse<OrderBody | Message>> => {
  const user = await UserModel.findByPk(userId);
  if (!user) return userNotFound;

  const order = await OrderModel.create({ userId });
  const orderId = order.dataValues.id;
  const updateProducts = productIds.map((productId) => ProductModel.update({ orderId }, {
    where: {
      id: productId,
    },
  }));
  await Promise.all(updateProducts);

  return {
    status: httpStatusCodes.CREATED,
    data: { productIds, userId },
  };
};

export default {
  getAllOrders,
  createOrder,
};
