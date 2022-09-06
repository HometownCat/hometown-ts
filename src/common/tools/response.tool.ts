import { v4 as uuidV4 } from 'uuid';
import { Response } from 'express';
import { HttpException } from '@nestjs/common';

const notFound = (message?: string) => {
  throw new HttpException({ message: message || 'not found' }, 404);
};

const invalidKey = () => {
  throw new HttpException({ message: 'invalid key' }, 404);
};

const missingKeys = (err: Error) => {
  console.error(err);

  throw new HttpException({ message: 'key is missing' }, 401);
};

const failToKeyValidation = (err: Error) => {
  console.error(err);

  throw new HttpException({ message: 'fail to validation user' }, 401);
};

const authFail = (message?: string) => {
  throw new HttpException({ message: message || 'Auth Fail' }, 401);
};

const notValid = (err: Error | string) => {
  console.error(err);
  throw new HttpException({ message: err.toString() }, 401);
};

const success = (res: Response, data: any) => {
  res.status(200).json({
    uuid: uuidV4(),
    data,
  });
};

const error = (res: Response, err: Error | string) => {
  res.status(500).json({ uuid: uuidV4(), message: err.toString() });
};

const customError = (errCode: number, message: string | Error) => {
  throw new HttpException({ message: message.toString() }, errCode);
};

export {
  notFound,
  invalidKey,
  missingKeys,
  failToKeyValidation,
  authFail,
  notValid,
  success,
  error,
  customError,
};
