import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  getAll() {
    return this.favoritesService.getAll();
  }

  @Post('album/:id')
  addAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    this.favoritesService.addAlbum(id);
  }

  @Post('artist/:id')
  addArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    this.favoritesService.addArtist(id);
  }

  @Post('track/:id')
  addTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    this.favoritesService.addTrack(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    this.favoritesService.removeAlbum(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    this.favoritesService.removeArtist(id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    this.favoritesService.removeTrack(id);
  }
}
