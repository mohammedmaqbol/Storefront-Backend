import { Request, Response } from 'express';
import { orderUser } from '../models/order';
import * as jwt from 'jsonwebtoken';
import config from '../config';
import Authorize from '../middleware/jwtMiddleware';
import { order } from '../types/orders_types';

const order = new orderUser();
// CREATE FUNCTION
const Create = async (req: Request, res: Response) => {
  const { user_id, status } = req.body;
  const order: order = { user_id, status };
  try {
    Authorize(req, user_id);
  } catch (err) {
    res.status(401);
    res.json('Access denied, invalid token');
    return;
  }

  try {
    const newOrder = await order.Index(order);
    res.json(newOrder);
  } catch (err) {
    res.json(err);
  }
};

// create the index route
const index = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token, secretToken as unknown as string);
  } catch (err) {
    res.status(401);
    res.json(`Access denied, invalid token`);
    return;
  }

  try {
    const allOrders = await order.index();
    res.json(allOrders);
  } catch (err) {
    res.json(err);
  }
};

// create the show route
const show = async (req: Request, res: Response) => {
  const o: Order = {
    id: req.params.id as unknown as number,
    status: req.body.status,
    userId: req.body.userId,
  };

  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token, secretToken as unknown as string);
  } catch (err) {
    res.status(401);
    res.json(`Access denied, invalid token`);
    return;
  }

  try {
    const specificOrder = await order.show(o.id, o.userId);
    res.json(specificOrder);
  } catch (err) {
    res.json(err);
  }
};

// create the add products to order route
const addProduct = async (req: Request, res: Response) => {
  const quantity: number = parseInt(req.body.quantity);
  const orderId: string = req.params.id;
  const productId: string = req.body.productId;

  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token, secretToken as unknown as string);
  } catch (err) {
    res.status(401);
    res.json(`Access denied, invalid token`);
    return;
  }

  try {
    const addedProducts = await order.addProduct(quantity, orderId, productId);
    res.json(addedProducts);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
