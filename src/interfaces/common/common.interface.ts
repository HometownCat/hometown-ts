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
