
import { Products } from '../products';
const productModel = new Products();

describe('Product Model', () => {
	describe('Test Methods Exist', () => {
		it('Index method should exist', () => {
			expect(productModel.Index).toBeDefined();
		});

		it('Show method should exist', () => {
			expect(productModel.Show).toBeDefined();
		});

		it('Create method should exist', () => {
			expect(productModel.Create).toBeDefined();
		});
	});

});