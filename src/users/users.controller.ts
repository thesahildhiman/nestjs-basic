import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create_user.dto';
import { UpdateUserDto } from './dto/update_user.dto';
import { PasswordService } from 'src/password/password.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly passwordService: PasswordService,
  ) {}

  @Post()
  async createUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
    @Res() res: Response,
  ) {
    try {
      const { password } = createUserDto;
      const hashedPassword = await this.passwordService.hashPassword(password);
      const newUser = await this.usersService.createUser({
        ...createUserDto,
        password: hashedPassword,
      });
      res.status(200).json({ newUser, message: 'user created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // ----------------------------------old code-------------------------------------
  // @Get()
  // getAllUsers(@Query('role') role?: 'intern' | 'student' | 'engineer') {
  //   return this.usersService.findAll(role);
  // }

  // @Get(':id')
  // getUserById(@Param('id', ParseIntPipe) id: number) {
  //   return this.usersService.findById(id);
  // }

  // @Delete(':id')
  // deleteUserById(@Param('id', ParseIntPipe) id: number) {
  //   return this.usersService.deleteUser(id);
  // }

  // @Post()
  // createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
  //   // ValidationPipe- validates body data against dto's
  //   return this.usersService.createUser(createUserDto);
  // }

  // @Patch(':id')
  // updateUser(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  // ) {
  //   return this.usersService.updateUser(id, updateUserDto);
  // }
}
