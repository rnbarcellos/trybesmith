import express from 'express';
import productsRouter from './routes/products.route';
import ordersRouter from './routes/orders.route';
import loginRouter from './routes/login.route';

const app = express();

app.use(express.json());
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use('/login', loginRouter);

export default app;
