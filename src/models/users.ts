import pool from '../database';
import { User } from '../types/users_types';
import config from '../config';
import bcrypt from 'bcrypt';

const hashPassword = (password: string) => {
  const salt = parseInt(config.salt as string, 10);
  return bcrypt.hashSync(`${password}${config.pepper}`, salt);
};
export class users {
  // SHOW ALL USERS
  async Index(): Promise<User[]> {
    try {
      const connection = await pool.connect();
      const query = 'SELECT id, firstName, lastName FROM users';
      const results = await connection.query(query);
      connection.release();
      return results.rows;
    } catch (err) {
      throw new Error(`Can not get users,${err}`);
    }
  }
  //GET USER BY ID
  async Show(id: string): Promise<User> {
    try {
      const connection = await pool.connect();
      const query =
        'SELECT id, firstName, lastName, userName FROM users WHERE id=($1)';
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
      const query = `INSERT INTO users(id, firstName, lastName, userName, password) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
      const results = await connection.query(query, [
        u.id,
        u.firstName,
        u.lastName,
        u.userName,
        hashPassword(u.password),
      ]);
      connection.release();
      return results.rows[0];
    } catch (err) {
      throw new Error(`Can not create this user ${u.firstName} ,${err}`);
    }
  }
  //AUTHENTICATE
  async authenticate(userName: string, password: string): Promise<User | null> {
    try {
      const connection = await pool.connect();
      const sql = 'SELECT password FROM users WHERE userName=$1';
      const result = await connection.query(sql, [userName]);
      if (result.rows.length) {
        const { password: hashPassword } = result.rows[0];
        const isPasswordValid = bcrypt.compareSync(
          `${password}${config.pepper}`,
          hashPassword
        );
        if (isPasswordValid) {
          const userInfo = await connection.query(
            'SELECT id, userName, firstName, lastName FROM users WHERE userName=($1)',
            [userName]
          );
          return userInfo.rows[0];
        }
      }
      connection.release();
      return null;
    } catch (err) {
      throw new Error(`Unable to login:${err}`);
    }
  }
}
