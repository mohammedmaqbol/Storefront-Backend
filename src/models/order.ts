import pool from '../database';
import { order } from '../types/orders_types';

export class orderUser {
 
// CREATE ORDER METHOD
  async Create(o: order): Promise<order> {
    try {
      const connection = await pool.connect();
      const sql =
        'INSERT INTO orders (status, user_id) VALUES ($1,$2) RETURNING *';
      const result = await connection.query(sql, [o.status, o.userId]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Can not create this order ${err}`);
    }
  }

  //  SHOW ALL ORDERS
  async Index(): Promise<order[]> {
    try {
      const connection = await pool.connect();
      const sql = 'SELECT * FROM orders';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(`can not show orders ${err}`);
    }
  }

  // GET ORDER BY ID
  async Show(id: number, userId: number): Promise<order> {
    try {
      const connection = await pool.connect();
      const sql = 'SELECT * FROM orders WHERE id=($1) AND u_id=($2)';
      const result = await connection.query(sql, [id, userId]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`can not get this user's order ${err}`);
    }
  }

  // Add PRODUCTS INTO ORDER
  async addProduct(
    quantity: number,
    order_id: string,
    product_id: string
  ): Promise<order> {
    try {
      const connection = await pool.connect();
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1,$2,$3) RETURNING *';
      const result = await connection.query(sql, [
        quantity,
        order_id,
        product_id,
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`can not add product in order ${err}`);
    }
  }
}
