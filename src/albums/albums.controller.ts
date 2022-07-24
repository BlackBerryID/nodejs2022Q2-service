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
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumsController {
  constructor(private albumsService: AlbumsService) {}

  @Get()
  getAll() {
    return this.albumsService.getAll();
  }

  @Get(':id')
  getAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.albumsService.getById(id);
  }

  @Post()
  createAlbum(@Body(new ValidationPipe()) createAlbumDto: CreateAlbumDto) {
    return this.albumsService.createAlbum(createAlbumDto);
  }

  @Put(':id')
  updateAlbum(
    @Body(new ValidationPipe()) updateAlbumDto: UpdateAlbumDto,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.albumsService.updateAlbum(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    this.albumsService.removeAlbum(id);
  }
}
