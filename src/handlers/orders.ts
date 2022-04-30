import { Request, Response } from 'express';
import { orderUser } from '../models/order';
import Authorize from '../middleware/jwtMiddleware';
import { order } from '../types/orders_types';

const Order = new orderUser();

// CREATE FUNCTION
export const Create = async (req: Request, res: Response) => {
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
    const newOrder = await Order.Create(order);
    res.json(newOrder);
  } catch (err) {
    res.json(err);
  }
};

//SHOW ONE FUNCTION
export const Show = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (id === undefined) {
    res.status(404);
    return res.json('The order is not found');
  }
  const order = await Order.Show(id);
  if(order === undefined){
    res.status(404);
		return res.json("Order not found");
  }
  
  res.json(order);
};

// create the add products to order route
export const addProduct = async (req: Request, res: Response) => {
  const quantity: number = parseInt(req.body.quantity);
  const orderId: string = req.params.id;
  const productId: string = req.body.productId;
  try {
    Authorize(req);
  } catch (err) {
    res.status(401);
    res.json('Access denied, invalid token');
    return;
  }
  try {
      const addProduct = await Order.addProduct(quantity, orderId, productId);
      res.json(addProduct);
    } catch (err) {
      res.status(400);
      res.json(err);
    }

    try {
      const addedProducts = await Order.addProduct(quantity, orderId, productId);
      res.json(addedProducts);
    } catch (err) {
      res.status(400);
      res.json(err);
    }
};
