import { Router } from 'express';
import OrdersController from '../controllers/orders.controller';
import validateToken from '../middlewares/validateToken.middleware';
import checkOrderBody from '../middlewares/checkOrderBody.middleware';

const router = Router();

router.get('/', OrdersController.getAllOrders);
router.post('/', validateToken, checkOrderBody, OrdersController.createOrder);

export default router;
