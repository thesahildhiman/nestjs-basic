import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create_user.dto';
import { UpdateUserDto } from './dto/update_user.dto';
import { PasswordService } from 'src/password/password.service';
import { ResponseService } from 'src/response/response.service';
import { LoginUserDto } from './dto/login_user.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/auth-guard/auth.guard';
// import { response } from 'express';

interface extendedRequest extends Request {
  user?: any;
}

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('signup')
  async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const user = await this.usersService.findUserByEmail(
        createUserDto?.email,
      );
      if (!user) {
        const { password } = createUserDto;
        const hashedPassword =
          await this.passwordService.hashPassword(password);
        const newUser = await this.usersService.createUser({
          ...createUserDto,
          password: hashedPassword,
        });
        return res
          .status(HttpStatus.CREATED)
          .json({ message: 'user created successfully', newUser });
      }
      throw new ConflictException('user already exist');
    } catch (error) {
      if (error instanceof ConflictException) {
        return res
          .status(HttpStatus.CONFLICT)
          .json({ message: 'User already exists' });
      }

      throw new HttpException(
        'internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('signin')
  async loginUser(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    try {
      const { email, password } = loginUserDto;
      const user = await this.usersService.findUserByEmail(email);
      if (!user) {
        throw new HttpException('user not found', HttpStatus.NOT_FOUND);
      }
      const comparePassword = await this.passwordService.comparePassword(
        password,
        user?.password,
      );

      if (comparePassword) {
        const payload = {
          email: user?.email,
          id: user?._id,
          // exp: Math.floor(Date.now() / 1000) + 60 * 60, //1h
        };
        const token = await this.jwtService.signAsync(payload, {
          expiresIn: '1h',
          secret: 'hjvjhvjhvb',
        });
        res.status(HttpStatus.ACCEPTED).json({ token: token, user: user });
      } else {
        throw new HttpException('invalid credentials', HttpStatus.UNAUTHORIZED);
      }
    } catch (error) {
      console.log('err---', error.message);
      throw new HttpException(
        'internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('update')
  @UseGuards(AuthGuard)
  async updateProfile(
    @Body() updateProfileDto: UpdateUserDto,
    @Req() req: extendedRequest,
    @Res() res: Response,
  ) {
    try {
      console.log(updateProfileDto, req.user);
      const updatedUser = await this.usersService.updateUserById(
        req.user.id,
        updateProfileDto,
      );
      console.log('---updated---', updatedUser);
      res
        .status(HttpStatus.OK)
        .json({ message: 'updated successfully', updatedUser });
    } catch (err) {
      throw new HttpException(
        'internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
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
