import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundException } from 'src/exceptions/not-found';
import { checkAllRequiredProps } from 'src/utils/check-all-required-props';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { checkAllowedProps } from 'src/utils/check-allowed-props';

const NOT_FOUND_MESSAGE = 'Artist not found';

@Injectable()
export class ArtistsService {
  private readonly artists: Artist[] = [];

  getAll() {
    return this.artists;
  }

  getById(id: string) {
    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) throw new NotFoundException(NOT_FOUND_MESSAGE);
    return artist;
  }

  createArtist(createArtistDto: CreateArtistDto) {
    const requiredProps = ['name', 'grammy'];

    checkAllRequiredProps(
      createArtistDto,
      'Name and grammy are required',
      requiredProps,
    );

    const tempArtistData: Artist = {
      id: uuidv4(),
      ...createArtistDto,
    };

    this.artists.push({ ...tempArtistData });
    return tempArtistData;
  }

  updateArtist(id: string, updateArtistDto: UpdateArtistDto) {
    const allowedProps = ['name', 'grammy'];

    checkAllowedProps(updateArtistDto, allowedProps);

    let tempArtistData = null;
    let artistIndex = null;

    this.artists.forEach((artist, index) => {
      if (artist.id === id) {
        artistIndex = index;
        tempArtistData = {
          ...artist,
          ...updateArtistDto,
        };
      }
    });

    if (artistIndex === null) {
      throw new NotFoundException(NOT_FOUND_MESSAGE);
    } else {
      this.artists[artistIndex] = { ...tempArtistData };
      return tempArtistData;
    }
  }

  removeArtist(id: string) {
    let artistIndex = null;

    this.artists.forEach((artist, index) => {
      if (artist.id === id) {
        artistIndex = index;
      }
    });

    if (artistIndex === null) {
      throw new NotFoundException(NOT_FOUND_MESSAGE);
    } else {
      this.artists.splice(artistIndex, 1);
    }
  }
}
