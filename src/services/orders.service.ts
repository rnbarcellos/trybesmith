import { Sequelize } from 'sequelize';
import OrderModel, { OrderSequelizeModel } from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import httpStatusCodes from '../utils/httpStatusCodes';
import { ServiceResponse } from '../types/ServiceResponse';

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

export default {
  getAllOrders,
};
