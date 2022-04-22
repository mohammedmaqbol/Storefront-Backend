import express from 'express';
import orders from '../handlers/orders';
import * as handlers from '../handlers/users';

const router = express.Router();
//ORDERS ROUTES
router.get('/orders', orders);
router.get('/orders/:id', orders);

//USERS ROUTES
router.get('/users', handlers.allUsers);
router.get('/user/:id', handlers.getUser);
router.post('/user', handlers.create);
router.patch('/user/:id', handlers.update);

export default router;
