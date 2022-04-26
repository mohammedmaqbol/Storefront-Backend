/*import { users } from '../../models/users';
import { Products }  from '../../models/products';
import supertest from 'supertest';
import app from '../../index';
import pool from '../../database';

const productModel = new Products()
const userModel = new users();
const request = supertest(app);

let userToken = '';
let orderId: string;
let productId: string;

describe('Test Order Endpoints', () => {
    beforeAll(async () => {
        await userModel.Create({
            userName: 'testUser',
            firstName: 'Test',
            lastName: 'User',
            password: 'test123'
        });
        await productModel.Create({
            name: 'Mobile',
            price: 19.99,
        });
    });

    afterAll(async () => {
        const connection = await pool.connect();
        const query =
            'DELETE FROM users; \nALTER SEQUENCE users_id_seq RESTART WITH 1;\n';
        await connection.query(query);
        connection.release();
    });

    it('Check If Server Runs, Should Return 200 Status', async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
    });

    it('Authenticate User And Get Token', async () => {
        const response = await request
            .post('/users/authenticate')
            .set('Content-type', 'application/json')
            .send({
                userName: 'testUser',
                password: 'test123'
            });
        expect(response.status).toBe(200);

        userToken = response.body;
    });

    it("Testing the Index endpoint", async () => {
		await request.get("/orders").expect(200);
	});

    it("Testing the read endpoint with valid Order ID", async () => {
		await request.get(`/order/${orderId}`).set("Authorization", `Bearer ${userToken}`).expect(200);
	});

    it("Testing the add order endpoint with valid token", async () => {
		await request
			.post(`/order/${orderId}/products`)
			.set("Authorization", `Bearer ${userToken}`)
			.send({ product_id: productId, quantity: 5 })
			.expect(200);
	});

});*/