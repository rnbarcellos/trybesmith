import { Router } from 'express';
import OrdersController from '../controllers/orders.controller';

const router = Router();

router.get('/', OrdersController.getAllOrders);

export default router;
