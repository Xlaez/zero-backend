import { Accounts, IAccount } from '@/models';

class AccountService {
  protected accountModel: typeof Accounts;

  public getAccountById = async (accountId: string | (() => string)) => {
    return this.accountModel.findById(accountId);
  };

  public getAccountByName = async (name: string | (() => string)) => {
    return this.accountModel.findOne({ name });
  };

  public getAccountByEmail = async (email: string | (() => string)) => {
    return this.accountModel.findOne({ email });
  };

  public createAccount = async (data: {
    name: string;
    email: string;
    password?: string;
    accType?: string;
    authType?: string;
    authToken?: string;
  }) => {
    const account: IAccount = await Accounts.create(data);
    return { accountHash: account.accountHash, email: account.email, name: account.name };
  };
}

export default AccountService;
