import { Module, forwardRef } from '@nestjs/common';
import { CommonConstant } from '@Src/common/constant/common.constant';
import { CloudWatchTool } from '@Src/common/tools/cloudWatch.tool';
import { ConfigModule } from '@Src/config/config.module';
import { LoggerService } from './logger.service';

@Module({
  imports: [forwardRef(() => ConfigModule)],
  providers: [LoggerService, CloudWatchTool, CommonConstant],
  exports: [LoggerService],
})
export class LoggerModule {}
