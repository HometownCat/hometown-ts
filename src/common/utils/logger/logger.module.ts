import { Module } from '@nestjs/common';
import { CommonConstant } from '@Src/common/constant/common.constant';
import { CloudWatchTool } from '@Src/common/tools/cloudWatch.tool';
import { LoggerService } from './logger.service';

@Module({
  providers: [LoggerService, CloudWatchTool, CommonConstant],
  exports: [LoggerService],
})
export class LoggerModule {}
