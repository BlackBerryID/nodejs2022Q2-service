import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  getAll() {
    return this.favoritesService.getAll();
  }

  // @Post()
  // createAlbum(@Body(new ValidationPipe()) createAlbumDto: CreateAlbumDto) {
  //   return this.albumsService.createAlbum(createAlbumDto);
  // }

  // @Delete(':id')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // removeAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
  //   this.albumsService.removeAlbum(id);
  // }
}
