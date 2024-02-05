// import { PartialType } from '@nestjs/mapped-types';
// import { CreateUserDto } from './create_user.dto';

import { IsEnum } from 'class-validator';

// partialType makes each field optional
// export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UpdateUserDto {
  @IsEnum(['male', 'female'])
  gender: string;
}
