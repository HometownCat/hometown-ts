import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';
import * as geoIp from 'geoip-country';
import * as _ from 'lodash';
import * as requestIp from 'request-ip';

@Injectable()
export class ParamsInitMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const geo = geoIp.lookup(requestIp.getClientIp(req));

    if (_.has(geo, 'country')) {
      req.params.locale = geo.country;
    } else {
      req.params.locale = 'localhost';
    }

    next();
  }
}
