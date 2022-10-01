import { CommonConstant } from './../common/constant/common.constant';
import { LoggerService } from 'src/common/utils/logger/logger.service';

import { forwardRef, Global, Module } from '@nestjs/common';

import { ConfigService } from './config.service';
import { LoggerModule } from '@Src/common/utils/logger/logger.module';

const providers = [ConfigService, LoggerService];

@Global()
@Module({
  imports: [forwardRef(() => LoggerModule)],
  providers: [ConfigService, CommonConstant, LoggerService],
  exports: [...providers],
})
export class ConfigModule {}
