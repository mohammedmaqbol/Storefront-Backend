import { Request, Response } from 'express';
import { products } from '../models/products';

const product = new products();
export const Index = async (_req: Request, res: Response) => {
  const products = await product.Index();
  res.json(products);
};