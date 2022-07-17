import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundException } from 'src/exceptions/not-found';
import { checkAllRequiredProps } from 'src/utils/check-all-required-props';
import { CreateArtistDto } from './dto/create-artist.dto';

@Injectable()
export class ArtistsService {
  private readonly artists: Artist[] = [];

  getAll() {
    return this.artists;
  }

  getById(id: string) {
    const user = this.artists.find((artist) => artist.id === id);
    if (!user) throw new NotFoundException();
    return user;
  }

  createArtist(createArtistDto: CreateArtistDto) {
    checkAllRequiredProps(createArtistDto, 'name', 'grammy');

    const tempArtistData: Artist = {
      id: uuidv4(),
      ...createArtistDto,
    };

    this.artists.push({ ...tempArtistData });
    return tempArtistData;
  }
}
