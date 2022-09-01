import QueryString, { ParsedQs } from 'qs';
import { Request, Response } from 'express';

export interface Callback {
  (err?: IError['err'], data?: any | { [key: string]: any }): any;
}

export interface IError {
  err?: Error | string | undefined | null;
}
