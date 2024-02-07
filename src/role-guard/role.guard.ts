import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtVerifyService } from 'src/jwt-verify/jwt-verify.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtVerifyService: JwtVerifyService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.split(' ')[1];
    const payload = await this.jwtVerifyService.verifyToken(token);
    const roles = this.reflector.get(Roles, context.getHandler());
    request.user = { ...payload, roles };
    return true;
  }
}
