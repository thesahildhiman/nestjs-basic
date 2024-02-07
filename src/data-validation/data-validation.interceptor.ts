import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class DataValidationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    if (!req.body.name) {
      throw new BadRequestException('name is required');
    }
    return next.handle().pipe(
      tap(() => {
        console.log('----after----- data validation---');
      }),
    );
  }
}
