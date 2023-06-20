import { Request, Response } from 'express';
import { AppRes, catchAsync, httpStatus } from '@dolphjs/core';
import { AccountService, SendMail, emailTypesServices } from '@/services';
import { errorMsgs, successMsgs } from '@/constants';
import { Redis, UniqueCodes } from '@/libs';

class AccountsController {
  protected service: AccountService = new AccountService();

  public createAccount = catchAsync(async (req: Request, res: Response) => {
    // Create user
    const { accountHash, email, name } = await this.service.createAccount(req.body);
    // Create Code
    if (accountHash.at(0) !== 'Z') throw new AppRes(httpStatus.INTERNAL_SERVER_ERROR, errorMsgs.accountNotCreated);
    const code = UniqueCodes.sixDigitsCode();
    //  Save to Redis
    Redis.addToRedis(code.toString(), email.toString(), 60 * 60 * 2);
    // Send Mail
    await new SendMail(email, { name, code, link: 'https://thezero.app' }, emailTypesServices.verifyMail).go();
    // Return response
    res.status(httpStatus.CREATED).json({ msg: successMsgs.accountCreated });
  });
}

export default AccountsController;
