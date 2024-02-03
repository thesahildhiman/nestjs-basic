import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers(@Query('role') role?: 'intern' | 'student' | 'engineer') {
    return this.usersService.findAll(role);
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.findById(parseInt(id));
  }

  @Delete(':id')
  deleteUserById(@Param('id') id: string) {
    return this.usersService.deleteUser(parseInt(id));
  }

  @Post()
  createUser(@Body() userData: { name: string; role: string }) {
    return this.usersService.createUser(userData);
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body() userData: { name: string; role: string },
  ) {
    return this.usersService.updateUser(parseInt(id), userData);
  }
}
