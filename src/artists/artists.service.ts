import { Injectable } from '@nestjs/common';
import { NotFoundException } from 'src/exceptions/not-found';
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

  createArtist(createArtistDto: CreateArtistDto) {}
}
