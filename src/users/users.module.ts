import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, userSchema } from 'src/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
