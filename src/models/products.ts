import pool from '../database';
import { Product } from '../types/product_types';

export class products {
  // SHOW ALL PRODUCTS
  async Index(): Promise<Product[]> {
    try {
      const connection = await pool.connect();
      const query = 'SELECT * FROM products';
      const results = await connection.query(query);
      connection.release();
      return results.rows;
    } catch (err) {
      throw new Error(`Can Not Get All Product, ${err}`);
    }
  }
  //GET PRODUCTS BY ID
  async Show(id: string): Promise<Product> {
    try {
      const connection = await pool.connect();
      const query = 'SELECT id, name, price FROM products WHERE id=($1)';
      const results = await connection.query(query, [id]);
      connection.release();
      return results.rows[0];
    } catch (err) {
      throw new Error(`Can Not Get This Product ${id} ,${err}`);
    }
  }
  //CREATE NEW PRODUCT
  async Create(p: Product) {
    try {
      const connection = await pool.connect();
      const query = `INSERT INTO users(id, name, price) VALUES ($1, $2, $3) RETURNING *`;
      const results = await connection.query(query, [p.id, p.name, p.price]);
      connection.release();
      return results.rows[0];
    } catch (err) {
      throw new Error(`Can Not Create This Product ${p.name} ,${err}`);
    }
  }
}
