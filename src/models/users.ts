import pool from '../database';
import { Users } from '../types/users_types';

export class users {
  // SHOW ALL USERS
  async Index(): Promise<Users[]> {
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
  async Show(id: string): Promise<Users> {
    try {
      const connection = await pool.connect();
      const query = 'SELECT id, firstName, lastName FROM users WHERE id=($1)';
      const results = await connection.query(query, [id]);
      connection.release();
      return results.rows[0];
    } catch (err) {
      throw new Error(`Can not get this user ${id} ,${err}`);
    }
  }
  //CREATE NEW USER
  async Create(u: Users) {
    try {
      const connection = await pool.connect();
      const query = `INSERT INTO users(id, firstName, lastName, password) VALUES ($1, $2, $3, $4) RETURNING *`;
      const results = await connection.query(query, [
        u.id,
        u.firstName,
        u.lastName,
        u.password,
      ]);
      connection.release();
      return results.rows[0];
    } catch (err) {
      throw new Error(`Can not create this user ${u.firstName} ,${err}`);
    }
  }
}
