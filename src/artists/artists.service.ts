import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { AlbumsService } from 'src/albums/albums.service';
import { TracksService } from 'src/tracks/tracks.service';
import { FavoritesService } from 'src/favorites/favorites.service';
import { InMemoryDb } from 'src/db/in-memory-db';

const NOT_FOUND_MESSAGE = 'Artist not found';

@Injectable()
export class ArtistsService {
  constructor(
    private readonly db: InMemoryDb,
    @Inject(forwardRef(() => AlbumsService))
    private readonly albumsService: AlbumsService,
    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}

  getAll() {
    return this.db.artists;
  }

  getById(id: string) {
    const artist = this.db.artists.find((artist) => artist.id === id);
    if (!artist) throw new NotFoundException(NOT_FOUND_MESSAGE);
    return artist;
  }

  createArtist(createArtistDto: CreateArtistDto) {
    const newArtist: Artist = {
      id: uuidv4(),
      ...createArtistDto,
    };

    this.db.artists.push({ ...newArtist });
    return newArtist;
  }

  updateArtist(id: string, updateArtistDto: UpdateArtistDto) {
    let updatedArtist = null;
    let artistIndex = null;

    this.db.artists.forEach((artist, index) => {
      if (artist.id === id) {
        artistIndex = index;
        updatedArtist = {
          ...artist,
          ...updateArtistDto,
        };
      }
    });

    if (updatedArtist === null) {
      throw new NotFoundException(NOT_FOUND_MESSAGE);
    } else {
      this.db.artists[artistIndex] = { ...updatedArtist };
      return updatedArtist;
    }
  }

  removeArtist(id: string) {
    const artistIndex = this.db.artists.findIndex((artist) => artist.id === id);

    if (artistIndex === -1) {
      throw new NotFoundException(NOT_FOUND_MESSAGE);
    } else {
      this.removeArtistIdFromAlbums(id);
      this.removeArtistIdFromTracks(id);
      this.favoritesService.removeArtist(id, true);
      // remove artist
      this.db.artists.splice(artistIndex, 1);
    }
  }

  private removeArtistIdFromAlbums(id: string) {
    const albums = this.albumsService.getAll();
    console.log('Albums', albums);
    albums.forEach((album) => {
      console.log('Album', album.artistId, id);
      if (album.artistId === id) {
        this.albumsService.updateAlbum(album.id, { artistId: null });
      }
    });
  }

  private removeArtistIdFromTracks(id: string) {
    const tracks = this.tracksService.getAll();
    console.log('Tracks', tracks);
    tracks.forEach((track) => {
      console.log('Track', track.artistId, id);
      if (track.artistId === id) {
        this.tracksService.updateTrack(track.id, { artistId: null });
      }
    });
  }
}
