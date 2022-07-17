import { IsString, IsBoolean } from 'class-validator';

export class UpdateArtistDto {
  @IsString()
  readonly name: string;
  @IsBoolean()
  readonly grammy: boolean;
}
