import supertest from "supertest";
import app from "../../index";
import { Product } from "../../types/product_types";
import {User} from "../../types/users_types";
import pool from '../../database';

const request = supertest(app);
describe("Testing Endpoint: /products", () => {
	const addProducts: Product = { name: "Hoverboard", price: 10000,};
	let productId: string;
	let token: string;
	beforeAll(async () => {
		const user: User = { firstname: "test", lastname: "tester", password: "Password" };
		await request
			.post("/user")
			.send(user)
			.expect(200)
			.then((res) => {
				token = res.body;
			});
	});

	it("Testing the create endpoint with an invalid token", async () => {
		await request.post("/product").send(addProducts).set("Authorization", "Bearer heyIamafaketoken").expect(401);
	});

	it("Testing the create endpoint with a valid token", async () => {
		await request
			.post("/product")
			.send(addProducts)
			.set("Authorization", `Bearer ${token}`)
			.expect(200)
			.then((res) => {
				expect(res.body.name).toEqual("Hoverboard");
				productId = res.body.id;
			});
	});

	it("Testing the index endpoint", async () => {
		await request
			.get("/products")
			.expect(200)
			.then((res) => {
				expect(res.text).toContain("Hoverboard");
			});
	});

	it("Testing the read endpoint with invalid product ID", async () => {
		await request.get("/products/500").set("Authorization", `Bearer ${token}`).expect(404);
	});

	it("Testing the read endpoint with valid product ID", async () => {
		await request
			.get(`/products/${productId}`)
			.set("Authorization", `Bearer ${token}`)
			.expect(200)
			.then((res) => {
				expect(res.text).toContain("Hoverboard");
			});
	});
});