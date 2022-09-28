import { ConfigService } from 'src/config/config.service';
import * as winston from 'winston';
import * as _ from 'lodash';
import { ConsoleLogger, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ICallback } from '@Src/interfaces/common/common.interface';
import { CloudWatchTool } from '@Src/common/tools/cloudWatch.tool';
import { CommonConstant } from '@Src/common/constant/common.constant';
import { v4 as uuidV4 } from 'uuid';
@Injectable()
export class LoggerService extends ConsoleLogger {
  private readonly logger: winston.Logger;
  constructor(
    private readonly configService: ConfigService,
    private readonly cloudWatchTool: CloudWatchTool,
    private readonly constant: CommonConstant,
  ) {
    super(LoggerService.name);
    // configService.winstonConfig 안 불러와져서 서버 init 할때 오류납니당
    this.logger = winston.createLogger(this.configService.winstonConfig);

    console.log = (message: any, params?: any) => {
      this.logger.debug(message, params);
    };
  }
  clouldWatchLog(
    req: Request,
    type: string,
    message: any,
    callback: ICallback,
  ) {
    const option = this.constant.getCloudWatchOption();
    const logRequest = this.constant.getLogRequestList();
    const sendLogs = {
      uuid: uuidV4(),
      headers: req.headers,
    };

    _.forEach(logRequest, (key: string) => {
      sendLogs[key] = req[key];
    });

    this.cloudWatchTool.log(
      option.logGroups.backend,
      option.logStreams[type],
      logRequest,
      callback,
    );
  }
  error(message: string, trace?: string): void {
    this.logger.error(message, trace);
  }
  warn(message: string): void {
    this.logger.warn(message);
  }
  info(message: string): void {
    this.logger.info(message);
  }
  http(message: string): void {
    this.logger.http(message);
  }
  debug(message: string): void {
    this.logger.debug(message);
  }
  log(message: string): void {
    this.logger.info(message);
  }
}
