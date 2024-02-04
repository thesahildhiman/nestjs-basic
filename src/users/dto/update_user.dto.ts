import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create_user.dto';

// partialType makes each field optional
export class UpdateUserDto extends PartialType(CreateUserDto) {}
