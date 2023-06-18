import AccountsController from '@/controllers/accounts.controllers';
import { Router } from '@dolphjs/core';

class AccountsRouter {
  public path?: string = '/api/v1/auth';
  public router = Router();

  protected controller: AccountsController = new AccountsController();
  constructor() {
    this.Routes();
  }
  private Routes() {
    this.router.get(`${this.path}`, this.controller.sendGreeting);
  }
}
export default AccountsRouter;
