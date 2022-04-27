import {Products} from '../products';
import pool from '../../database';
import {Product} from '../../types/product_types';

const productStore = new Products();
const productBase: Product = { name: "MacBook", price: 10000000};
let product: Product;

describe("Testing Model: product", () => {

          it("Must have a create method", () => {
		expect(productStore.Create).toBeDefined();
	});

	it("Testing the create model with a product", async () => {
		product = await productStore.Create(productBase);
		expect({ name: product.name, price: product.price}).toEqual({
			name: productBase.name,
			price: productBase.price,
		});
	});

	it("Must have an index method", () => {
		expect(productStore.Index).toBeDefined();
	});

	it("Testing the index model to include the product", async () => {
		const products = await productStore.Index();
		expect(products).toContain(product);
	});

	it("Must have a show method", () => {
		expect(productStore.Show).toBeDefined();
	});

	it("Testing the show model to return the product", async () => {
		const foundProducts = await productStore.Show(product.id as number);
		expect(foundProducts).toEqual(product);
	});
          afterAll(async () => {  
                    const connection = await pool.connect();
                    const sql = 'DELETE FROM products;';
                    await connection.query(sql);
                    connection.release();
          });
});