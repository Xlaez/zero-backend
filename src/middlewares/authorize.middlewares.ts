import { configs } from '@/config';
import { errorMsgs } from '@/constants';
import { AccountService } from '@/services';
import { AppRes, catchAsync, httpStatus } from '@dolphjs/core';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

const validateAccount = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.headers['x-auth-token'];
  if (!authToken) return next(new AppRes(httpStatus.UNAUTHORIZED, errorMsgs.customMsg('provide a valid token header')));
  if (typeof authToken !== 'string')
    return next(new AppRes(httpStatus.UNAUTHORIZED, errorMsgs.customMsg('provide a valid token type')));

  const payload = verify(authToken, configs.jwt.secret);
  /**
   * Perform Database query on accounts collections and get account then set the req.acc option to that account
   */
  const account = await new AccountService().getAccountById(payload.sub);
  if (!account) return next(new AppRes(httpStatus.UNAUTHORIZED, errorMsgs.notAuthorized));
  //@ts-ignore
  req.account = account;
  next();
});

export { validateAccount };
