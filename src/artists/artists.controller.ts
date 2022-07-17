import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private artistsService: ArtistsService) {}

  @Get()
  getAll() {
    return this.artistsService.getAll();
  }

  @Get('id')
  getArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.artistsService.getById(id);
  }

  @Post()
  createArtist(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.createArtist(createArtistDto);
  }

  @Put('id')
  updateArtist(
    @Body() updateArtistDto: UpdateArtistDto,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.artistsService.updateArtist(id, updateArtistDto);
  }
}
