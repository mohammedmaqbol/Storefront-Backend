
import { User } from '../../types/users_types';
import supertest from 'supertest';
import app from '../../index';
import config  from '../../config';
import { JwtPayload, verify } from 'jsonwebtoken';
const request = supertest(app);


describe("Testing Endpoint: /users", () => {
	const user: User = { userName: 'firstTest', firstName: "test", lastName: "tester", password: "123" };
	let token: string;
	let userId: string;
	it("Testing the create endpoint", async () => {
		await request
			.post("/user")
			.send(user)
			.expect(200)
			.then((res) => {
				token = res.body;
				const decodedJWT = verify(token as string, config.tokenSecret as string) as JwtPayload;
				userId = decodedJWT.user.id as string;
			});
	});

	it("Testing the index endpoint with valid token", async () => {
		await request.get("/users").set("Authorization", `Bearer ${token}`).expect(200);
	});

	it("Testing the index endpoint with invalid token", async () => {
		await request.get("/users").set("Authorization", "Bearer asdfasdf").expect(401);
	});

	it("Testing the read endpoint with valid token and valid user ID", async () => {
		await request.get(`/user/${userId}`).set("Authorization", `Bearer ${token}`).expect(200);
	});

	it("Testing the read endpoint with valid token and invalid user ID", async () => {
		await request.get("/user/999").set("Authorization", `Bearer ${token}`).expect(404);
	});

	it("Testing Token and invalid user ID", async () => {
		await request.get("/user/999").set("Authorization", "Bearer heyIamafaketoken").expect(401);
	});

	it("Testing the delete endpoint with valid token and valid user ID", async () => {
		await request.delete("/user").set("Authorization", `Bearer ${token}`).send({ id: userId }).expect(200);
	});
});
