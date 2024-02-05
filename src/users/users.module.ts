import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, userSchema } from 'src/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PasswordService } from 'src/password/password.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
    // JwtModule.register({
    //   global: true,
    //   secret: '6278167216gdwqygqwgdug7qw86w78qw7qwg78wqdw',
    //   signOptions: { expiresIn: '1h' },
    // }),
  ],
  controllers: [UsersController],
  providers: [UsersService, PasswordService, JwtService],
})
export class UsersModule {}
