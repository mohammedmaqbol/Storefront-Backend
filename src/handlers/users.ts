import { Request, Response } from 'express';
import { users } from '../models/users';
import * as jwt from 'jsonwebtoken';
import config from '../config';
import { User } from '../types/users_types';

const user = new users();

//GET ALL USERS FUNCTION
export const Index = async (req: Request, res: Response) => {
  try {
    const Index = await user.Index();
    res.json(Index);
  } catch (err) {
    res.status(401);
    return res.json(err);
  }
};

//GET ONE USER FUNCTION
export const Show = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const Show = await user.Show(id as unknown as string);
    res.json(Show);
  } catch (err) {
    res.status(401);
    return res.json(err);
  }
};

//CREATE NEW USER
export const Create = async (req: Request, res: Response) => {
  const { id, userName, firstName, lastName, password } = req.body;
  if (
    id === undefined ||
    userName === undefined ||
    firstName === undefined ||
    lastName === undefined ||
    password === undefined
  ) {
    res.status(400);
    return res.send('chack  username, firstname, lastname, password');
  }
  const newUser: User = { id, userName, firstName, lastName, password };
  try {
    const create_user = await user.Create(newUser);
    // eslint-disable-next-line prefer-const
    let token = jwt.sign(
      { user: create_user },
      process.env.TOKEN_SECRET as string
    );
    res.json(token);
    res.json(create_user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
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
