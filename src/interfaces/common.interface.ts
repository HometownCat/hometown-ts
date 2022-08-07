import QueryString, { ParsedQs } from 'qs';
import { Request, Response } from 'express';

export interface Callback {
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
}
export interface queryInterface {
  code?: string;
  state?: string;
  authuser?: number;
  oauth_token?: string | string[];
  oauth_verifier?: string | string[];
}

export interface redshiftInterface {
  uuid: string;
  hostname: string;
  user_ip: string;
  provider?: string;
  login_id?: string;
  user_id?: number;
  email_id?: string;
  response?: string;
  error?: string;
  datetime: string;
}

export interface responseData {
  uuid?: string;
  auth?: number;
  loginId?: string;
  mature?: number;
  sign?: number;
  id?: number;
  userId?: number;
  token?: string;
  revokeToken?: string;
  checkIn?: string;
  method?: string;
  type?: string;
  email?: string;
  registerGoods?: object;
  reserveGoods?: string[];
}

export interface responseParameterInterface {
  xOrigin: string;
  user: userInterface;
  auth?: string | QueryString.ParsedQs | string[] | QueryString.ParsedQs[];
  query?: queryInterface;
}

export interface googleReturnData {
  // req.query
  auth?: string | QueryString.ParsedQs | string[] | QueryString.ParsedQs[];
  method: string;
  provider: string;
  providerAccountId: string;
  email: string;
  name: string;
}

export interface twitterReturnData {
  providerAccountId: string;
  provider: string;
  method: string;
  email: string;
  displayName: string;
  // req.query
  oauth_token?: string | string[];
  oauth_verifier?: string | string[];
}

export interface lineReturnData {
  provider: string;
  providerAccountId: string;
  image: string;
  email: string;
  method: string;
}

export interface yahooReturnData {
  provider: string;
  providerAccountId: string;
  method: string;
  email: string;
}

export interface AuthCommonProcessParams {
  req: Request;
  res: Response;
  // pathProvider: string;
  responseFunc: ({
    xOrigin,
    user,
    auth,
  }: responseParameterInterface) => Promise<responseData>;
}

export interface axiosParams {
  xOrigin: string;
  data: googleReturnData | twitterReturnData | lineReturnData | yahooReturnData;
  auth?: string | ParsedQs | string[] | ParsedQs[];
  query?: ParsedQs;
}
