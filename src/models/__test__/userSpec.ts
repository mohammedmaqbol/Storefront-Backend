import { usersModel, hashPassword } from '../users';
import {User} from '../../types/users_types';
import pool from '../../database';

const userStore = new usersModel();
const userBase: User = {firstname: "R2", lastname: "D2", password : '123'};
let user: User;
let _users;
describe("Testing Model: user", () => {
	it("Must have a create method", () => {
		expect(userStore.Create).toBeDefined();
	});

	it("Testing the create model with a user", async () => {
		user = await userStore.Create(userBase);
                                        
		expect({ firstname: user.firstname, lastname: user.lastname }).toEqual({
			firstname: userBase.firstname,
			lastname: userBase.lastname,
		});
	});

	it("Must have an index method", () => {
		expect(userStore.Index).toBeDefined();
	});

          it("Testing the index model to include the user", async () => {
		const users = await userStore.Index();
		expect(users).toContain(user);
	});

	it("Must have a show method", () => {
		expect(userStore.Show).toBeDefined();
	});
          afterAll(async () => {  
                    const connection = await pool.connect();
                    const sql = 'DELETE FROM users;';
                    await connection.query(sql);
                    connection.release();
          });
});