import { users } from '../users';
const userModel = new users();

describe('User Model', () => {
	describe('Test Methods Exist', () => {
		it('Index method should exist', () => {
			expect(userModel.Index).toBeDefined();
		});

		it('Show method should exist', () => {
			expect(userModel.Show).toBeDefined();
		});

		it('Create method should exist', () => {
			expect(userModel.Create).toBeDefined();
		});
	});
});