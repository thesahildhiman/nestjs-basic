import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

interface IMessage{
    message: Array<string>
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    // console.log('----excep filter----',ctx)
    if (exception instanceof BadRequestException) {
      const msg = exception.getResponse()

      console.log('>>>>>>>>>>>', (msg as {message: Array<string>}));
      return response.status(exception.getStatus()).json({
        statusCode: exception.getStatus(),
        timestamp: new Date().toISOString(),
        path: request.url,
        message: '----',
        //   exception instanceof Error
        //     ? exception.message
        //     : 'Internal Server Error',
      });
    }
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message:
        exception instanceof Error
          ? exception.message
          : 'Internal Server Error',
    });
  }
}
