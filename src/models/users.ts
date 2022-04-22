import pool from '../database';
import { Users } from '../types/users_types';

export class users {
  // SHOW ALL USERS
  async allUsers(): Promise<Users[]> {
    try {
      const connection = await pool.connect();
      const query = 'SELECT id, first_name, last_name FROM users';
      const results = await connection.query(query);
      connection.release();
      return results.rows;
    } catch (err) {
      throw new Error(`Can not get users,${err}`);
    }
  }
  //GET USER BY ID
  async getUser(id: string): Promise<Users> {
    try {
      const connection = await pool.connect();
      const query = 'SELECT id, first_name, last_name FROM users WHERE id=($1)';
      const results = await connection.query(query, [id]);
      connection.release();
      return results.rows[0];
    } catch (err) {
      throw new Error(`Can not get this user ${id} ,${err}`);
    }
  }
  //CREATE NEW USER
  async create(u: Users) {
    try {
      const connection = await pool.connect();
      const query = `INSERT INTO users(id, first_name, last_name, user_password) VALUES ($1, $2, $3, $4) RETURNING *`;
      const results = await connection.query(query, [
        u.id,
        u.first_name,
        u.last_name,
        u.user_password,
      ]);
      connection.release();
      return results.rows[0];
    } catch (err) {
      throw new Error(`Can not create this user ${u.first_name} ,${err}`);
    }
  }
  // UPDATE USER 
  async update(u: Users) {
    try {
      const connection = await pool.connect();
      const query = `UPDATE users SET first_name=$1, last_name=$2, user_password=$3 WHERE id=$4 RETURNING *`;
      const results = await connection.query(query, [
        u.id,
        u.first_name,
        u.last_name,
        u.user_password,
      ]);
      connection.release();
      return results.rows[0];
    } catch (err) {
      throw new Error(`Can not create this user ${u.first_name} ,${err}`);
    }
  }
}
