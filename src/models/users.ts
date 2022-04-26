import pool from '../database';
import { User } from '../types/users_types';
import config from '../config';
import bcrypt from 'bcrypt';

const pepper = config.password;

const hashPassword = (password: string) => {
  const salt = parseInt(config.salt as string, 10);
  return bcrypt.hashSync(`${password}${config.pepper}`, salt);
};

export class users {
  // SHOW ALL USERS
  async Index(): Promise<User[]> {
    try {
      const connection = await pool.connect();
      const query = 'SELECT userName, firstName, lastName FROM users';
      const results = await connection.query(query);
      connection.release();
      return results.rows;
    } catch (err) {
      throw new Error(`Can not get users,${err}`);
    }
  }
  //GET USER BY ID
  async Show(id: number): Promise<User> {
    try {
      const connection = await pool.connect();
      const query =
        'SELECT id, userName,  firstName, lastName, userName FROM users WHERE id=($1)';
      const results = await connection.query(query, [id]);
      connection.release();
      return results.rows[0];
    } catch (err) {
      throw new Error(`Can not get this user ${id} ,${err}`);
    }
  }
  //CREATE NEW USER
  async Create(u: User) {
    try {
      const connection = await pool.connect();
      const query = `INSERT INTO users(userName, firstName, lastName, password) VALUES ($1, $2, $3, $4) RETURNING *`;
        const results = await connection.query(query, [
          u.userName,
          u.firstName,
          u.lastName,
          hashPassword(u.password),
        ]);
      connection.release();
      return results.rows[0];
    } catch (err) {
      throw new Error(`Can not create this user ${u.userName} ,${err}`);
    }
  }
  //AUTHENTICATE
  async authenticate(userName: string, password: string): Promise<User | null> {
		const connection = await pool.connect();
		const query = `SELECT password FROM users WHERE userName = $1`;
		const result = await connection.query(query, [userName]);

		if (result.rows.length) {
			const user = result.rows[0];
			if (bcrypt.compareSync(password + pepper, user.password)) {
				connection.release();
				return user;
			}
		}
		throw new Error('Invalid username or Password');
	}
}
