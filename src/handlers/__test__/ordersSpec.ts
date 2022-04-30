import supertest from "supertest";
import app from "../../index";
import { order } from "../../types/orders_types";
import { JwtPayload, verify } from "jsonwebtoken";
import config from "../../config";


const request = supertest(app);


describe("Testing Endpoint: /orders", () => {
	const addOrder: order = { user_id: "", status: "active" };
	let productId: string;
	let userId: number;
	let orderId: string;
	let token: string;
	beforeAll(async () => {
		await request
			.post("/user")
			.send({ firstname: "test", lastname: "tester", password: "Password" })
			.expect(200)
			.then((res) => {
				token = res.body;
				const decodedJWT = verify(token as string, config.tokenSecret as string) as JwtPayload;
				userId = decodedJWT.user.id;
				addOrder.user_id = userId as unknown as string;
			});
		await request
			.post("/product")
			.send({ name: "ED 209", price: "100000" })
			.set("Authorization", `Bearer ${token}`)
			.expect(200)
			.then((res) => {
				productId = res.body.id;
			});
	});

	it("Testing the create endpoint with an invalid token", async () => {
		await request.post("/order").send(addOrder).set("Authorization", "Bearer heyIamafaketoken").expect(401);
	});

	it("Testing the create endpoint with a valid token and mismatched user", async () => {
		await request
			.post("/order")
			.send({ status: addOrder.status, user_id: 500 })
			.set("Authorization", `Bearer ${token}`)
			.expect(401);
	});
	

	it("Testing the create endpoint with a valid token and valid user", async () => {
		await request
			.post("/order")
			.send(addOrder)
			.set("Authorization", `Bearer ${token}`)
			.expect(200)
			.then((res) => {
				orderId = res.body.id;
			});
	});


	it("Testing the read endpoint with invalid Order ID", async () => {
		await request.get("/orders/500").set("Authorization", `Bearer ${token}`).expect(404);
	});

	it("Testing the read endpoint with valid Order ID", async () => {
		await request.get(`/order/${orderId}`).set("Authorization", `Bearer ${token}`).expect(200);
	});

	it("Testing the add order endpoint with invalid token", async () => {
		await request
			.post(`/orders/${orderId}/products`)
			.set("Authorization", "Bearer heyIamafaketoken")
			.send({ orderId, product_id: productId, quantity: 5 })
			.expect(401);
	});

	it("Testing the add order endpoint with valid token", async () => {
		await request
			.post(`/orders/${orderId}/products`)
			.set("Authorization", `Bearer ${token}`)
			.send({ product_id: productId, quantity: 5 })
			.expect(200);
	});

});