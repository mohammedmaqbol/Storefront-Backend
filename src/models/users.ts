import pool from '../database';
import { User } from '../types/users_types';
import config from '../config';
import bcrypt from 'bcrypt';

const pepper = config.password;
const salt_rounds = config.password;

export class usersModel {
  [x: string]: any;
  // SHOW ALL USERS
  async Index(): Promise<User[]> {
    try {
      const connection = await pool.connect();
      const query = 'SELECT * FROM users';
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
        'SELECT id,firstname, lastname, username FROM users WHERE id=($1)';
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
      const query = `INSERT INTO users(firstname, lastname, password) VALUES ($1, $2, $3) RETURNING *`;
      const hash = bcrypt.hashSync(u.password + pepper, parseInt(String(salt_rounds)));
      const result = await connection.query(query, [u.firstname, u.lastname, hash]);
      const user = result.rows[0];
      connection.release();
      return user;
    } catch (err) {
      throw new Error(`Can not create this user ${u.id, u.firstname} ,${err}`);
    }
  }
  //AUTHENTICATE
  async authenticate(firstname: string, lastname: string, password: string): Promise<User | null> {
  try {
        const connection = await pool.connect();
        const query = "SELECT * FROM users WHERE firstname=($1) AND lastname=($2)";
        const result = await connection.query(query, [firstname, lastname]);
        if (result.rows.length) {
          const user = result.rows[0];
          if (bcrypt.compareSync(password + pepper, user.password)) {
            return user;
          }
        }
  } catch (err) {
    throw err
  }
    return null;
  }
}