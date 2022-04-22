import pool from '../database';

export type order_types = {
  id?: number;
  status: string;
  items?: [] | [null];
  user_id: string;
};

export class orders {
  async all_orders(): Promise<order_types[]> {
    try {
      const connection = await pool.connect();
      const query = 'SELECT * FROM orders';
      const results = await connection.query(query);
      connection.release();
      return results.rows;
    } catch (err) {
      throw new Error(`Can not get order,${err}`);
    }
  }
}
