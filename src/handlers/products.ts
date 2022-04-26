import { Request, Response } from 'express';
import { Products } from '../models/products';
import Authorize from '../middleware/jwtMiddleware';
import { Product } from '../types/product_types';

const store = new Products();

export const Index = async (_req: Request, res: Response) => {
  const products = await store.Index();
  res.json(products);
};

export const Show = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const product = await store.Show(id);
  if (product === undefined) {
    res.status(404);
    return res.json('Product not found');
  }
  res.json(product);
};

export const Create = async (req: Request, res: Response) => {
  const { name, price } = req.body;
  const product: Product = { name, price };
  try {
    Authorize(req);
  } catch (err) {
    res.status(401);
    return res.json('Access denied, invalid token');
  }
  try {
    const newProduct = await store.Create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};