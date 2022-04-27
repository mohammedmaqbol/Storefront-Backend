import { Request, Response } from 'express';
import { usersModel } from '../models/users';
import { sign } from "jsonwebtoken";
import config from '../config';
import { User } from '../types/users_types';

const user = new usersModel();

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
  const newUser: User = {
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		password: req.body.password
	};
  
  try {
    const create_user = await user.Create(newUser);
    let token = sign( { newUser: create_user } as unknown as string, config.tokenSecret as string);
    res.json({...create_user, token : token});
  } catch (err) {
    res.status(400).json(user);
    
  }
};

//Authenticate Method
export const authenticate = async (req: Request, res: Response) => {
  
  try{
        const { id, password } = req.body;
        const users = await user.authenticate(id, password);
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
