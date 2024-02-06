import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtVerifyService {
  constructor(private readonly jwtService: JwtService) {}

  public async verifyToken(token: string): Promise<any> {
    if (!token || token.trim() === '') {
      throw new UnauthorizedException('unauthorized user');
    }

    const payload = await this.jwtService.verifyAsync(token, {
      secret: 'hjvjhvjhvb',
    });
    if (payload.exp && Date.now() / 1000 > payload.exp) {
      throw new UnauthorizedException('Token has expired');
    }

    return payload;
  }
}
