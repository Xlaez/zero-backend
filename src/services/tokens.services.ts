import { configs } from '@/config';
import { errorMsgs } from '@/constants';
import { IAccount, Tokens } from '@/models';
import { AppRes, httpStatus, mongoose } from '@dolphjs/core';
import { sign, verify } from 'jsonwebtoken';
import moment, { Moment } from 'moment';

class TokenService {
  public readonly generateToken = (
    accountId: string | mongoose.Types.ObjectId,
    type: string,
    expires: Moment = configs.jwt.duration
  ) => {
    const payload = {
      sub: accountId,
      iat: moment().unix(),
      exp: expires.unix(),
      type,
    };
    return sign(payload, configs.jwt.secret);
  };

  public save = async (
    token: string,
    accountId: string | mongoose.Types.ObjectId,
    expires: Moment | Date,
    type: string,
    blacklisted = false
  ) => {
    //@ts-ignore
    return Tokens.create({ token, accountId, expires: expires.toDate(), type, blacklisted });
  };

  public verify = async (token: string, type: string) => {
    const payload = verify(token, configs.jwt.secret);
    const tokenDoc = await Tokens.findOne({ token, type, accountId: payload.sub, blacklisted: false });
    if (!tokenDoc) throw new AppRes(httpStatus.BAD_REQUEST, errorMsgs.customMsg('access token not found, login again'));
    return tokenDoc;
  };

  public generateAuthTokens = async (account: IAccount) => {
    const accessTokenExpires = moment().add(configs.jwt.duration, 'minutes');
    const accessToken = this.generateToken(account.id, 'access', accessTokenExpires);

    const refreshTokenExpires = moment().add(configs.jwt.duration, 'days');
    const refreshToken = this.generateToken(account.id, 'refresh', refreshTokenExpires);

    await this.save(refreshToken, account.id, refreshTokenExpires, 'refresh');

    return {
      access: {
        token: accessToken,
        expires: accessTokenExpires,
      },
      refresh: {
        token: refreshToken,
        expires: refreshTokenExpires,
      },
    };
  };
}

export default TokenService;
