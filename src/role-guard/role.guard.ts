import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtVerifyService } from 'src/jwt-verify/jwt-verify.service';

@Injectable()
export class RoleGuardGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtVerifyService: JwtVerifyService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.split(' ')[1];

    const payload = await this.jwtVerifyService.verifyToken(token);

    const roles = this.reflector.get(Roles, context.getHandler());
    console.log('--reflector---', roles, payload);
    request.user = { ...payload, roles };
    return true;
  }
}
