import { Request, Response } from 'express';
import ProductsService from '../services/products.service';

const createProductController = async (req: Request, res: Response): Promise<void> => {
  const { name, price, orderId } = req.body;
  const product = await ProductsService.createProduct({ name, price, orderId });
  const { id } = product.data;
  res.status(product.status).json({ id, name, price });
};

const getAllProductsController = async (req: Request, res: Response): Promise<void> => {
  const products = await ProductsService.getAllProducts();
  res.status(products.status).json(products.data);
};

export default {
  createProductController,
  getAllProductsController,
};