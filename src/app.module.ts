import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './post/post.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './logging/logging.interceptor';
import { GlobalExceptionFilterTestModule } from './global-exception-filter-test/global-exception-filter-test.module';
import { GlobalExceptionFilter } from './global-exception-filter-test/global-exception.filter';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:1KCFz8WXjqOX19H0@cluster0.3zvmnhy.mongodb.net/nestJs',
    ),
    UsersModule,
    PostModule,
    GlobalExceptionFilterTestModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    { provide: APP_FILTER, useClass: GlobalExceptionFilter },
  ],
})
export class AppModule {}
//mongodb://127.0.0.1:27017/nestJs
