import { Request, Response } from 'express';
import { users } from '../models/users';

const user = new users();
//GET ALL USERS FUNCTION
export const Index = async (_req: Request, res: Response) => {
  const Index = await user.Index();
  res.json(Index);
};
//GET ONE USER FUNCTION
export const Show = async (req: Request, res: Response) => {
  const Show = await user.Show(req.params.id as string);
  res.json(Show);
};
//CREATE NEW USER
export const Create = async (req: Request, res: Response) => {
  const Create = await user.Create(req.body);
  res.json(Create);
};
