import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { InMemoryDb } from 'src/db/in-memory-db';
import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { TracksService } from 'src/tracks/tracks.service';

const EXCEPTION_MESSAGE = (entity: string) => `${entity} not found`;

@Injectable()
export class FavoritesService {
  constructor(
    private readonly db: InMemoryDb,
    @Inject(forwardRef(() => ArtistsService))
    private readonly artistsService: ArtistsService,
    @Inject(forwardRef(() => AlbumsService))
    private readonly albumsService: AlbumsService,
    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,
  ) {}

  getAll(): FavoritesRepsonse {
    const response = {
      artists: [],
      albums: [],
      tracks: [],
    };

    this.db.favorites.artists.forEach((artistId) => {
      response.artists.push(this.artistsService.getById(artistId));
    });

    this.db.favorites.albums.forEach((albumId) => {
      response.albums.push(this.albumsService.getById(albumId));
    });

    this.db.favorites.tracks.forEach((trackId) => {
      response.tracks.push(this.tracksService.getById(trackId));
    });

    return response;
  }

  addAlbum(id: string) {
    const album = this.db.albums.find((album) => album.id === id);
    if (!album)
      throw new UnprocessableEntityException(EXCEPTION_MESSAGE('Album'));
    this.db.favorites.albums.push(album.id);
  }

  addArtist(id: string) {
    const artist = this.db.artists.find((artist) => artist.id === id);
    if (!artist)
      throw new UnprocessableEntityException(EXCEPTION_MESSAGE('Artist'));
    this.db.favorites.artists.push(artist.id);
  }

  addTrack(id: string) {
    const track = this.db.tracks.find((track) => track.id === id);
    if (!track)
      throw new UnprocessableEntityException(EXCEPTION_MESSAGE('Track'));
    this.db.favorites.tracks.push(track.id);
  }

  removeAlbum(id: string, skipError: boolean = false) {
    const albumIndex = this.db.favorites.albums.findIndex(
      (albumId) => albumId === id,
    );

    if (albumIndex === -1 && !skipError) {
      throw new NotFoundException(EXCEPTION_MESSAGE('Album'));
    }

    if (albumIndex !== -1) {
      this.db.favorites.albums.splice(albumIndex, 1);
    }
  }

  removeArtist(id: string, skipError: boolean = false) {
    const artistIndex = this.db.favorites.artists.findIndex(
      (artistId) => artistId === id,
    );

    if (artistIndex === -1 && !skipError) {
      throw new NotFoundException(EXCEPTION_MESSAGE('Artist'));
    }

    if (artistIndex !== -1) {
      this.db.favorites.artists.splice(artistIndex, 1);
    }
  }

  removeTrack(id: string, skipError: boolean = false) {
    const trackIndex = this.db.favorites.tracks.findIndex(
      (trackId) => trackId === id,
    );

    if (trackIndex === -1 && !skipError) {
      throw new NotFoundException(EXCEPTION_MESSAGE('Track'));
    }

    if (trackIndex !== -1) {
      this.db.favorites.tracks.splice(trackIndex, 1);
    }
  }
}
