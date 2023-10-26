import { Request, Response } from 'express';
import OrdersService from '../services/orders.service';

const getAllOrders = async (req: Request, res: Response): Promise<void> => {
  const orders = await OrdersService.getAllOrders();
  res.status(orders.status).json(orders.data);
};

export default {
  getAllOrders,
};
