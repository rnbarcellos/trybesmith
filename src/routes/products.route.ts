import { Router } from 'express';
import ProductsController from '../controllers/products.controller';
import checkProductBody from '../middlewares/checkProductBody.middleware';

const router = Router();

router.post('/', checkProductBody, ProductsController.createProductController);
router.get('/', ProductsController.getAllProductsController);

export default router;