import { Router } from '@dolphjs/core';
import DemoAppController from '@/controllers/demo.controller';

class DemoAppRouter {
	public path?: string = '/api/v1';
	public router = Router();

	protected controller: DemoAppController = new DemoAppController();
	constructor() {
		this.Routes();
	}
    private Routes() {
		this.router.get(`${this.path}`, this.controller.sendGreeting);
	}
}
export default DemoAppRouter;