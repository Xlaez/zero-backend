import AuthController from '@/controllers/auth.controllers';
import { Routes } from '@/interfaces/routes.interfaces';
import { Router } from '@dolphjs/core';

class AuthRouter {
  public path?: string = '/api/v1/auth';
  public router = Router();

  protected controller: AuthController = new AuthController();
  constructor() {
    this.Routes();
  }
  private Routes() {
    this.router.get(`${this.path}`, this.controller.sendGreeting);
  }
}
export default AuthRouter;
