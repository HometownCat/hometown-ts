import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonConstant {
  private logRequestList: Array<string>;
  private awsRegions: {
    [propName: string]: string;
  };
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
    this.awsRegions = {
      seoul: 'ap-northeast-2',
      virginia: 'us-east-1',
      ohio: 'ap-northeast-2',
      sydney: 'ap-southeast-2',
      tokyo: 'ap-northeast-1',
    };
    this.cloudWatchOption = {
      logGroups: {
        backend: 'hometown-backend-logs',
      },
      logStreams: {
        error: 'hometown-backend-error',
        success: 'hometown-backend-success',
      },
      regions: { ...this.awsRegions },
    };
  }
  public getLogRequestList() {
    return [...this.logRequestList];
  }
  public getAwsRegions() {
    return { ...this.awsRegions };
  }
  public getCloudWatchOption() {
    return { ...this.cloudWatchOption };
  }
}
