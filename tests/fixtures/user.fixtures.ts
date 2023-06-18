import { mongoose } from '@dolphjs/core';
import faker from 'faker';
import { hash } from 'argon2';
import { Accounts, IAccount } from '../../src/models';

const randomUserPassword = 'Randompassword123';

const accountOne = {
  _id: new mongoose.Types.ObjectId(),
  name: faker.name.findName(),
  accType: 'merchant',
  email: faker.internet.email().toLowerCase(),
  password: hash(randomUserPassword),
  unHashedPassword: randomUserPassword,
};

const accountTwo = {
  _id: new mongoose.Types.ObjectId(),
  name: faker.name.findName(),
  accType: 'buyer',
  email: faker.internet.email().toLowerCase(),
  password: hash(randomUserPassword),
  unHashedPassword: randomUserPassword,
};

const insertAccounts = async (accounts: IAccount[]) => {
  await Accounts.insertMany(accounts.map((account: IAccount) => ({ ...account })));
};

export { insertAccounts, accountOne, accountTwo };
