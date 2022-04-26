import { Request, Response } from 'express';
import { users } from '../models/users';
import jwt from 'jsonwebtoken';
import config from '../config';
import { User } from '../types/users_types';

const user = new users();

//GET ALL USERS FUNCTION
export const Index = async (_req: Request, res: Response) => {
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
    const Show = await user.Show(id);
    res.json(Show);
  } catch (err) {
    res.status(401);
    return res.json(err);
  }
};

//CREATE NEW USER
export const Create = async (req: Request, res: Response) => {
  //const {userName, firstName, lastName, password } = req.body;
  //const newUser: User = {userName, firstName, lastName, password };
  const newUser: User = {
		userName: req.body.userName,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		password: req.body.password
	};
  
  try {
    const create_user = await user.Create(newUser);
    console.log({...create_user});
    
    let token = jwt.sign( { newUser: create_user } as unknown as string, config.tokenSecret as string);
    res.json({...create_user, token : token});
  } catch (err) {
    res.status(400).json(user);
    
  }
};

//Authenticate Method
export const authenticate = async (req: Request, res: Response) => {
  
  try{
        const { userName, password } = req.body;
        const users = await user.authenticate(userName, password);
        const token = jwt.sign({ users }, config.tokenSecret as unknown as string);
        if (!users) {
          return res.status(401).json({
            status: 'error',
            message: 'the username and password do not match please try again',
          });
        }
          return res.json({
            status: 'success',
            data: { ...users, token },
            message: 'user authenticated successfully',
          });
  }catch (err) {
    throw err;
  }
};
