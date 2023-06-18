import { Accounts } from '@/models';

class AccountService {
  protected accountModel: typeof Accounts;

  public getAccountById = async (accountId: string) => {
    return this.accountModel.findById(accountId);
  };

  public getAccountByName = async (name: string) => {
    return this.accountModel.findOne({ name });
  };

  public getAccountByEmail = async (email: string) => {
    return this.accountModel.findOne({ email });
  };
}

export default AccountService;
