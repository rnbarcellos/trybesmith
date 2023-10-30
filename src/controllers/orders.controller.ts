import { Request, Response } from 'express';
import OrdersService from '../services/orders.service';

const getAllOrders = async (req: Request, res: Response): Promise<void> => {
  const orders = await OrdersService.getAllOrders();
  res.status(orders.status).json(orders.data);
};

const createOrder = async (req: Request, res: Response): Promise<void> => {
  const { productIds, userId } = req.body;
  const order = await OrdersService.createOrder(productIds, userId);
  res.status(order.status).json(order.data);
};

export default {
  getAllOrders,
  createOrder,
};
