import ProductModel from '../database/models/product.model';
import httpStatusCodes from '../utils/httpStatusCodes';
import { Product } from '../types/Product';
import { ServiceResponse } from '../types/ServiceResponse';

type ProductCreate = {
  name: string;
  price: string;
  orderId: number;
};

const createProduct = async (product: ProductCreate): Promise<ServiceResponse<Product>> => {
  const createdProduct = await ProductModel.create(product);
  return {
    status: httpStatusCodes.CREATED,
    data: createdProduct.dataValues,
  };
};

const getAllProducts = async (): Promise<ServiceResponse<Product[]>> => {
  const products = await ProductModel.findAll();
  return {
    status: httpStatusCodes.OK,
    data: products.map((product) => product.dataValues),
  };
};

export default {
  createProduct,
  getAllProducts,
};
