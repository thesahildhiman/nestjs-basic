import { Module } from '@nestjs/common';
import { GlobalExceptionFilterTestController } from './global-exception-filter-test.controller';
import { GlobalExceptionFilterTestService } from './global-exception-filter-test.service';

@Module({
  controllers: [GlobalExceptionFilterTestController],
  providers: [GlobalExceptionFilterTestService]
})
export class GlobalExceptionFilterTestModule {}
