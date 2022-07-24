import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateArtistDto {
  @IsString()
  @IsOptional()
  readonly name: string;
  @IsBoolean()
  @IsOptional()
  readonly grammy: boolean;
}
