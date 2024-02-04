import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

// class-validators used for field validations
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['intern', 'student', 'engineer'], { message: 'valid role required' })
  role: string;
}
