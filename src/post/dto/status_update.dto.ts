import { IsEnum, IsString } from 'class-validator';

enum Status {
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected',
}

export class StatusUpdateDto {
  @IsEnum(Status)
  status: string;

  @IsString()
  id: string;
}
