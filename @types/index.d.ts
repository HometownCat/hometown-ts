import { userInterface } from '@Src/interfaces/common.interface';

declare global {
  namespace Express {
    interface Request extends Request {
      user: userInterface | Error;
      uuid: string;
      err: Error;
    }
  }
}
