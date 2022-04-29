import express from 'express';
import * as users_handlers from '../handlers/users';
import * as products_handlers from '../handlers/products';
import * as orders_handlers from '../handlers/orders';

const router = express.Router();

//ORDER ROUTES
router.get('/order/:id', orders_handlers.Show);
router.post('/order', orders_handlers.Create);
router.post('/orders/:id/products', orders_handlers.addProduct);

//PRODUCTS ROUTES
router.get('/products', products_handlers.Index);
router.get('/products/:id', products_handlers.Show);
router.post('/product', products_handlers.Create);

//USERS ROUTES
router.get('/users', users_handlers.Index);
router.get('/user/:id', users_handlers.Show);
router.post('/user', users_handlers.Create);
router.post('/users/login', users_handlers.authenticate);

export default router;
