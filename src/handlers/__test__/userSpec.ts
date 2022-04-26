import { users } from '../../models/users';
import pool from '../../database';
import {User} from '../../types/users_types';

const userModel = new users();

describe('User Model', () => {
  describe('Test methods exists', () => {
    it('should have an Get Many Users method', () => {
      expect(userModel.Index).toBeDefined();
    });

    it('should have a Get One User method', () => {
      expect(userModel.Show).toBeDefined();
    });

    it('should have a Create User method', () => {
      expect(userModel.Create).toBeDefined();
    });

    it('should have an Authenticate User method', () => {
      expect(userModel.authenticate).toBeDefined();
    });
  });

  describe('Test User Model Logic', () => {
    const user = {
		userName: 'test@test.com',
		firsName: 'Test',
		lastName: 'User',
		password: 'test123',
	} as unknown as User;

    beforeAll(async () => {
      const createdUser = await userModel.Create(user);
      user.id = createdUser.id;
	  console.log(user.id, 123213);
	  
    });

    afterAll(async () => {
      const connection = await pool.connect();

      const sql = 'DELETE FROM users \nALTER SEQUENCE users_id_seq RESTART WITH 1;';
      await connection.query(sql);
      connection.release();
    });

    it('Create method should return a New User', async () => {
      const createdUser = await userModel.Create({
			  user_name: 'test2User',
			  firsName: 'Test',
			  lastName: 'User',
			  password: 'test123',
		  } as unknown as User);
      expect(createdUser).toEqual({
			  id: createdUser.id,
			  userName: 'test2@test.com',
			  firsName: 'Test',
			  lastName: 'User',
		  } as unknown as User);
    });

    it('Get Many method should return All available users in DB', async () => {
      const users = await userModel.Index();
      expect(users.length).toBe(2);
    });

    it('Get One method should return testUser when called with ID', async () => {
      const returnedUser = await userModel.Show(user.id as unknown as number);
      expect(returnedUser.id).toBe(user.id);
      expect(returnedUser.userName).toBe(user.userName);
      expect(returnedUser.firstName).toBe(user.firstName);
      expect(returnedUser.lastName).toBe(user.lastName);
    
    });
  });
});