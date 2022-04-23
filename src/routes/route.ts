import express from 'express';
import * as users_handlers from '../handlers/users';
import * as products_handlers from '../handlers/products';

const router = express.Router();
//PRODUCTS ROUTES
router.get('/products', products_handlers.Index);

//USERS ROUTES
router.get('/users', users_handlers.Index);
router.get('/user/:id', users_handlers.Show);
router.post('/user', users_handlers.Create);
router.post('/users/authenticate', users_handlers.authenticate);
export default router;
