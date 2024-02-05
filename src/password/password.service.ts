import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  async hashPassword(password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

  async comparePassword(plainPassword: string, hashedPassword: string) {
    const bool = await bcrypt.compare(plainPassword, hashedPassword);
    return bool;
  }
}
