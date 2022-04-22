import { Request, Response } from 'express';
import { users } from '../models/users';

const user = new users();
//GET ALL USERS FUNCTION
export const allUsers = async (_req: Request, res: Response) => {
  const show_users = await user.allUsers();
  res.json(show_users);
};
//GET ONE USER FUNCTION
export const getUser = async (req: Request, res: Response) => {
  const show_user = await user.getUser(req.params.id as unknown as string);
  res.json(show_user);
};
//CREATE NEW USER
export const create = async (req: Request, res: Response) => {
  const create_user = await user.create(req.body);
  res.json(create_user)
}
//UPDATE USER
export const update = async (req: Request, res: Response) => {
  const update_user = await user.update(req.body);
  res.json(update_user)
}