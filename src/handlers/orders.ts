import { Request, Response } from 'express';
import { orderUser } from '../models/order';
import Authorize from '../middleware/jwtMiddleware';
import { order } from '../types/orders_types';

const Order = new orderUser();

// CREATE FUNCTION
export const Create = async (req: Request, res: Response) : Promise<any> => {
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
export const Show = async (req: Request, res: Response) : Promise<any>  => {
 const id = parseInt(req.params.id);
 try {
        if (!id) {
          return res.status(404), res.json('The order is not found');
        }
        const order = await Order.Show(id);
        if(!order){
          return res.status(404), res.json("Order not found");
        }
        res.json(order);
 } catch (err) {
   res.json(err)
 }
};

// create the add products to order route
export const addProduct = async (req: Request, res: Response) : Promise<any> => {
  const quantity: number = parseInt(req.body.quantity);
  const orderId: string = req.params.id;
  const productId: string = req.body.product_id;
  if (!orderId || !productId || !quantity) {
		res.status(400);
		return res.send("Missing/Invalid parameters, the following parameter are required: orderId, productId, quantity");
	}

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
};
