import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@Src/config/config.service';
import { Request, Response, NextFunction } from 'express';
import * as response from '../src/common/tools/response.tool';

@Injectable()
export class ValidationMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { 'x-api-key': apiKey } = req.headers;

    if ('greqgeaqrrg@!!!' === this.configService.get('API_KEY')) {
      next();
    } else {
      response.invalidKey();
    }
  }
}
