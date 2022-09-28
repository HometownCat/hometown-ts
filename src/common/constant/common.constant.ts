import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonConstant {
  private logRequestList: Array<string>;
  private cloudWatchOption: {
    logGroups: {
      [propName: string]: string;
    };
    logStreams: {
      [propName: string]: string;
    };
    regions: {
      [propName: string]: string;
    };
  };
  constructor() {
    this.logRequestList = ['body', 'query', 'params', 'originalUrl'];
    this.cloudWatchOption = {
      logGroups: {
        backend: 'hometown-backend-logs',
      },
      logStreams: {
        error: 'hometown-backend-error',
        success: 'hometown-backend-success',
      },
      regions: {
        seoul: 'ap-northeast-2',
      },
    };
  }
  public getLogRequestList() {
    return [...this.logRequestList];
  }
  public getCloudWatchOption() {
    return { ...this.cloudWatchOption };
  }
}
