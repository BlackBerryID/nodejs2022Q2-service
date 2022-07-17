import { IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  readonly oldPassword: string;
  @IsString()
  readonly newPassword: string;
}
