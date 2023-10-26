import express from 'express';
import productsRouter from './routes/products.route';
import ordersRouter from './routes/orders.route';

const app = express();

app.use(express.json());
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);

export default app;
