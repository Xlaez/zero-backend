import Dolph from '@dolphjs/core';
import helmet from 'helmet';
import cors from 'cors';
import * as dotenv from 'dotenv';
import xss from 'xss-clean';
import { ENV, PORT, configs } from '@/config';
import routes from './routes';

dotenv.config({});

const middlewares = [helmet(), cors({ origin: '*' }), xss()];
const mongo = { options: configs.mongoose.options, url: configs.mongoose.url };

const dolph = new Dolph(routes, PORT, ENV, mongo, middlewares);
dolph.listen();
