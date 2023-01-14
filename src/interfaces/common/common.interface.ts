import QueryString, { ParsedQs } from 'qs';
import { Request, Response } from 'express';
import { ErrorCallback } from 'async';

export interface ICallback {
  (err?: IError['err'], data?: any | { [key: string]: any }): any;
}

export interface IError {
  err?: Error | string | undefined | null;
}

export interface userInterface {
  provider: string;
  id: string;
  email?: string;
  displayName?: string;
  method?: string;
  image?: string;
  access_token?: string;
  revoke_token?: string;
}
