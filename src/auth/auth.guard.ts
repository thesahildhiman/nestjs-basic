import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization.split(' ')[1];

      if (!token || token.trim() === '') {
        throw new UnauthorizedException('unauthorized user');
      }
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'hjvjhvjhvb',
      });
      request.user = payload;
      return true;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
