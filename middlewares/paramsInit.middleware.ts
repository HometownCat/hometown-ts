import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@Src/config/config.service';
import { Request, Response, NextFunction } from 'express';
import * as response from '../src/common/tools/response.tool';

@Injectable()
export class ParamsInitMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    next();
  }
}
