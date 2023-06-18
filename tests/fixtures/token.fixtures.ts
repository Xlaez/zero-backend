import moment from 'moment';
import { configs } from '../../src/config';
import { TokenService } from '../../src/services';
import { accountOne } from './user.fixtures';

const accessTokenExpires = moment().add(configs.jwt.duration, 'minutes');
const userAccessToken = new TokenService().generateToken(accountOne._id, 'access', accessTokenExpires);

export { accessTokenExpires, userAccessToken };
