import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as AWS from 'aws-sdk';
import { AWSError } from 'aws-sdk';
import { DescribeLogStreamsResponse } from 'aws-sdk/clients/cloudwatchlogs';
import * as _ from 'lodash';
import * as async from 'async';
import { ICallback } from '@Src/interfaces/common/common.interface';

dotenv.config();

@Injectable()
export class CloudWatchTool {
  private cloudWatchLogs: AWS.CloudWatchLogs;
  constructor() {
    AWS.config.credentials = new AWS.SharedIniFileCredentials({
      profile: process.env.AWS_PROFILE,
    });
    this.cloudWatchLogs = new AWS.CloudWatchLogs({
      region: 'ap-northeast-2',
    });
  }

  private describeLogStream(logGroupName: string, logStreamName: string) {
    return new Promise((resolve, reject) => {
      this.cloudWatchLogs.describeLogStreams(
        {
          logGroupName,
        },
        (err: AWSError, data: DescribeLogStreamsResponse) => {
          if (err) {
            return reject(err);
          }
          const stream = _.find(data.logStreams, stream => {
            if (stream.logStreamName === logStreamName) {
              return stream;
            }
            return false;
          });
          if (!stream) {
            return reject(`stream not exist [stream]:[${logStreamName}]`);
          }
          return resolve(stream);
        },
      );
    });
  }

  private putLog(
    logGroupName: string,
    logStreamName: string,
    stream: AWS.CloudWatchLogs.LogStream,
    logs: Error | string | object,
  ) {
    return new Promise((resolve, reject) => {
      this.cloudWatchLogs.putLogEvents(
        {
          logEvents: [
            {
              message: JSON.stringify(logs),
              timestamp: new Date().getTime(),
            },
          ],
          logGroupName,
          logStreamName,
          sequenceToken: stream.uploadSequenceToken,
        },
        (err: AWSError) => {
          if (err) {
            return reject(err);
          }
          return resolve(null);
        },
      );
    });
  }

  public log(
    groupName: string,
    logStreamName: string,
    logs: Error | string | object,
    callback: ICallback,
  ) {
    try {
      async.waterfall(
        [
          (callback: ICallback) => {
            this.describeLogStream(groupName, logStreamName)
              .then(stream => {
                callback(null, stream);
              })
              .catch(err => callback(err));
          },
          (stream: AWS.CloudWatchLogs.LogStream, callback: ICallback) => {
            this.putLog(groupName, logStreamName, stream, logs)
              .then(() => {
                callback(null, null);
              })
              .catch(err => callback(err));
          },
        ],
        err => {
          if (err) return callback(err);
          return callback(null, 'success');
        },
      );
    } catch (e) {
      callback(e);
    }
  }
}
