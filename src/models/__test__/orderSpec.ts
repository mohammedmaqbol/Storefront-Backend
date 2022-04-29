import {orderUser} from "../order";
import { usersModel } from "../users";
import pool from '../../database';
import {order} from '../../types/orders_types';

const orderStore = new orderUser();
const userStore = new usersModel();
const orderBase: order = { status: "active", user_id:'' as unknown as string};
let order: order;

describe("Testing Model: order", () => {
	beforeAll(async () => {
		const user = await userStore.Create({ firstname: "R2", lastname: "D2", password: "beep-boop" });
		if (user.id) orderBase.user_id = user.id.toString();
	});
	it("Must have a create method", () => {
		expect(orderStore.Create).toBeDefined();
	});

	it("Testing the create model with an order", async () => {
		order = await orderStore.Create(orderBase);
		expect({ status: order.status, user_id: order.user_id }).toEqual({
			status: orderBase.status,
			user_id: orderBase.user_id,
		});
	});

	it("Must have a show method", () => {
		expect(orderStore.Show).toBeDefined();
	});

	it("Testing the show model to return the order", async () => {
		const foundOrder = await orderStore.Show(order.id as number);
		expect(foundOrder).toEqual({ id: order.id, status: order.status, user_id: order.user_id });
	});
	
});
