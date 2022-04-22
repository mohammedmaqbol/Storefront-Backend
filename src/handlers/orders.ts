import { Request, Response } from 'express';
import { orders } from '../models/orders';

const order = new orders();
const all_orders = async (_req: Request, res: Response) => {
  const orders = await order.all_orders();
  res.json(orders);
};
export default all_orders;
