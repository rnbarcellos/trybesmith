import { Router } from 'express';
import ProductsController from '../controllers/products.controller';

const router = Router();

router.post('/', ProductsController.createProductController);
router.get('/', ProductsController.getAllProductsController);

export default router;