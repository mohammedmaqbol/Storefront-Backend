import { Request, Response } from 'express';
import { users } from '../models/users';
import jwt from 'jsonwebtoken';
import config from '../config';

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
export const authenticate = async (req: Request, res: Response) => {
  try {
    const { userName, password } = req.body;
    const auth_user = await user.authenticate(userName, password);
    const token = jwt.sign({ user }, config.tokenSecret as string);
    if (!auth_user) {
      return res.status(401).json({
        status: 'error',
        message: 'User Name or Password Is Felid',
      });
      this
    }
    return res.json({
      data: { ...auth_user, token },
    });
  } catch (err) {
    res.status(400).json({ message: 'wrong' });
  }
};
