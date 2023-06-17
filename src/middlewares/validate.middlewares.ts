import { AppRes, httpStatus, pick } from '@dolphjs/core';
import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const validate = (schema) => (req: Request, res: Response, next: NextFunction) => {
  const aceptedSchema = pick(schema, ['params', 'body', 'query']);
  const object = pick(req, Object.keys(aceptedSchema));
  const { value, error } = Joi.compile(aceptedSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(new AppRes(httpStatus.BAD_REQUEST, errorMessage));
  }

  Object.assign(req, value);
  return next();
};

export default validate;
