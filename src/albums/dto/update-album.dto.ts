import { IsString, IsUUID, IsInt, IsOptional } from 'class-validator';

export class UpdateAlbumDto {
  @IsString()
  name?: string;
  @IsInt()
  year?: number;
  @IsOptional()
  @IsUUID('4')
  artistId?: string | null; // refers to Artist
}
