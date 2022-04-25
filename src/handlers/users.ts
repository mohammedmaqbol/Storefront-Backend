import { Request, Response } from 'express';
import { users } from '../models/users';
import jwt from 'jsonwebtoken';
import config from '../config';
import Authorize from '../middleware/jwtMiddleware';

const user = new users();
//GET ALL USERS FUNCTION
export const Index = async (req: Request, res: Response) => {
  try {
    Authorize(req);
  } catch (err) {
    res.status(401);
    return res.json(err);
  }
  const Index = await user.Index();
  res.json(Index);
};

//GET ONE USER FUNCTION
export const Show = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (id === undefined) {
    res.status(400);
  }
  try {
    Authorize(req);
  } catch (err) {
    res.status(401);
    return res.json(err);
  }
  const Show = await user.Show(id as unknown as string);
  res.json(Show);
};

//CREATE NEW USER
export const Create = async (req: Request, res: Response) => {
  const { userName, firstName, lastName, password } = req.body;
  if (
    userName === undefined ||
    firstName === undefined ||
    lastName === undefined ||
    password === undefined
  ) {
    res.status(400);
    return res.send('Check First Name or Last Name or Password');
  }
  try {
    const Create = (await user.Create(
      userName,
      firstName,
      lastName,
      password
    )) as User;
    res.json(token);
  } catch (err) {}
};

//Authenticate Method
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
    }
    return res.json({
      data: { ...auth_user, token },
    });
  } catch (err) {
    res.status(400).json({ message: 'wrong' });
  }
};
