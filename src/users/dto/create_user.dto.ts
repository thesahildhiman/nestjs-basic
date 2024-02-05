import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

// class-validators used for field validations
export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  // @IsEnum(['intern', 'student', 'engineer'], { message: 'valid role required' })
  // role: string;
}
