import {
  IsString,
  IsUUID,
  IsInt,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsInt()
  @IsNotEmpty()
  year: number;
  @IsUUID('4')
  @IsOptional()
  artistId: string | null; // refers to Artist
}
