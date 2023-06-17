import Dolph from '@dolphjs/core';
import helmet from 'helmet';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { ENV, PORT } from '@/config';
import DemoAppRouter from '@/routes/demo.route';

dotenv.config({});

const dolph = new Dolph([new DemoAppRouter()], PORT, ENV,  null , [
	helmet(),
  cors({'origin': '*'})
]);
dolph.listen();
