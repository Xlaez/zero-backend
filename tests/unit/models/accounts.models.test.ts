import faker from 'faker';
import { Accounts } from '../../../src/models';

// @ts-ignore
describe('Accounts Model', () => {
  describe('Accounts Validation', () => {
    let newUser: { name: string; email: string; password: string };
    beforeEach(() => {
      newUser = {
        email: faker.name.findName(),
        name: faker.internet.email(),
        password: 'RandomPassword123',
      };
    });

    test('should correctly validate a user', async () => {
      await expect(new Accounts(newUser).validate()).resolves.toBeUndefined();
    });

    test('should throw validation password is not alphaNum', async () => {
      newUser.password = 'aaaaaaaaaa';
      await expect(new Accounts(newUser).validate()).rejects.toThrow();
    });

    test('should throw validation error if password is less than 7 characters', async () => {
      newUser.password = 'passw';
      await expect(new Accounts(newUser).validate()).rejects.toThrow();
    });
  });
});
