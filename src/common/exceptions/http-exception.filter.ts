import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { Request, Response } from 'express';
import { LoggerService } from '../utils/logger/logger.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly loggerService: LoggerService) {}
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus();
    const exceptionMessage = exception.getResponse();

    this.loggerService.clouldWatchLog(
      request,
      'error',
      exceptionMessage,
      () => {
        response.status(status).json({
          uuid: uuidV4(),
          message: exceptionMessage,
        });
      },
    );
  }
}
