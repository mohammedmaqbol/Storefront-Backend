import supertest from "supertest";
import app from "../../index";
import { JwtPayload, verify } from "jsonwebtoken";
import { User}  from '../../types/users_types';
import config from '../../config';

const request = supertest(app);

describe("Testing Endpoint: /users", () => {
	const user: User = { firstname: "ATD", lastname: "Dummy", password: "Password" };
	let token: string;
	let userId: string;

	it("Testing the create endpoint", async () => {
		await request
			.post("/user")
			.send(user)
			.expect(200)
			.then((res) => {
				token = res.body;console.log(1);
				const decodedJWT = verify(token as string, config.tokenSecret as string) as JwtPayload;
        console.log(2);
        console.log(decodedJWT);
        
        userId = decodedJWT.user.id;
			});
	});

	it("Testing the index endpoint with valid token", async () => {
		await request.get("/users").set("Authorization", `Bearer ${token}`).expect(200);
	});

	it("Testing the index endpoint with invalid token", async () => {
		await request.get("/users").set("Authorization", "Bearer heyIamafaketoken").expect(401);
	});

	it("Testing the read endpoint with valid token and valid user ID", async () => {
		await request.get(`/user/${userId}`).set("Authorization", `Bearer ${token}`).expect(200);
	});

	it("Testing the read endpoint with valid token and invalid user ID", async () => {
		await request.get("/users/999").set("Authorization", `Bearer ${token}`).expect(404);
	});

	it("Testing the read endpoint with invalid token and invalid user ID", async () => {
		await request.get("/user/999").set("Authorization", "Bearer heyIamafaketoken").expect(401);
	});

	it("Testing the authorization endpoint with valid user", async () => {
		await request.post("/users/login").send(user).expect(200);
	});

	it("Testing the authorization endpoint with invalid user", async () => {
		await request
			.post("/users/authorization")
			.send({ firstname: "DTA", lastname: "ymmuD", password: "drowssaP" })
			.expect(401)
			.then((res) => {
				expect(res.text).toContain("Incorrect user information");
			});
	});
});