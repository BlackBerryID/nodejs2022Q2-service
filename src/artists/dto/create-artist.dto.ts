import { IsString, IsBoolean } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  readonly name: string;
  @IsBoolean()
  readonly grammy: boolean;
}
