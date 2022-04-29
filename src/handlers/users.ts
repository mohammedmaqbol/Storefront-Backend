import { Request, Response } from 'express';
import { usersModel } from '../models/users';
import { sign } from "jsonwebtoken";
import config from '../config';
import { User } from '../types/users_types';
import Authorize from "../middleware/jwtMiddleware";
const user = new usersModel();

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
  try {
        Authorize(req);
  } catch (err) {
        res.status(401);
        return res.json(err);
  }
  const Show = await user.Show(id);
    res.json(Show);
};

//CREATE NEW USER
const Create = async (req: Request, res: Response) => {
	const { firstname, lastname, password } = req.body;
	if (firstname === undefined || lastname === undefined || password === undefined) {
		res.status(400);
		return res.send("Missing/Invalid parameters, the following parameter are required: firstname, lastname, password");
	}
	const new_user: User = { firstname, lastname, password };
	try {
		const newUser = await user.Create(new_user);
		var token = sign({ user: { id: newUser.id, firstname, lastname } }, process.env.TOKEN_SECRET as string);
		res.json(token);
	} catch (err) {
		res.status(400);
		res.json(String(err) + user);
	}
};

//Authenticate Method
export const authenticate = async (req: Request, res: Response) => {
	const { firstname, lastname, password } = req.body;
	if (firstname === undefined || lastname === undefined || password === undefined) {
		res.status(400);
		return res.send("Missing/Invalid parameters, the following parameter are required: firstname, lastname, password");
	}
	const user_base: User = { firstname, lastname, password };
	try {
		const u = await user.authenticate(user_base.firstname, user_base.lastname, user_base.password);
    if (u === null) {
			res.status(401);
			res.json("Incorrect user information");
		} else {
			var token = sign({ user: { id: u.id, firstname, lastname } }, config.tokenSecret as string);
			res.json(token);
		}
	} catch (error) {
		res.status(401);
		res.json({ error });
	}
};
