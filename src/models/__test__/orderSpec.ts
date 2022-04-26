import { orderUser } from '../order';

const orderModel = new orderUser();

describe('Order Model', () => {
		
		describe('Test Order Methods Exist', () => {
			it('Index method should exist', () => {
				expect(orderModel.Index).toBeDefined();
			});

			it('Show method should exist', () => {
				expect(orderModel.Show).toBeDefined();
			});

			it('Create method should exist', () => {
				expect(orderModel.Create).toBeDefined();
			});
		});

		describe('Test Order Product Methods Exist', () => {
			it('Index method should exist', () => {
				expect(orderModel.Index).toBeDefined();
			});

			it('Show method should exist', () => {
				expect(orderModel.Show).toBeDefined();
			});

			it('Add method should exist', () => {
				expect(orderModel.Create).toBeDefined();
			});

		});
});

