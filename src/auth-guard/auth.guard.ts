import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { JwtVerifyService } from 'src/jwt-verify/jwt-verify.service';
// import { Roles } from 'src/decorators/roles.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    // private reflector: Reflector,
    private readonly jwtVerifyService: JwtVerifyService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // const roles = this.reflector.get(Roles, context.getHandler());
    // console.log('--reflector---', roles);
    try {
      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization.split(' ')[1];

      // if (!token || token.trim() === '') {
      //   throw new UnauthorizedException('unauthorized user');
      // }
      // const payload = await this.jwtService.verifyAsync(token, {
      //   secret: 'hjvjhvjhvb',
      // });
      // if (payload.exp && Date.now() / 1000 > payload.exp) {
      //   throw new UnauthorizedException('Token has expired');
      // }
      const payload = await this.jwtVerifyService.verifyToken(token);
      console.log('---pay;oald---', payload);
      request.user = payload;
      return true;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
