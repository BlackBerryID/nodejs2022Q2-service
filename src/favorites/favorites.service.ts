import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { NotFoundException } from 'src/exceptions/not-found';
import { UnprocessableEntityException } from 'src/exceptions/unprocessable-entity';
import { TracksService } from 'src/tracks/tracks.service';

const EXCEPTION_MESSAGE = (entity: string) => `${entity} not found`;

@Injectable()
export class FavoritesService {
  constructor(
    @Inject(forwardRef(() => ArtistsService))
    private readonly artistsService: ArtistsService,
    @Inject(forwardRef(() => AlbumsService))
    private readonly albumsService: AlbumsService,
    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,
  ) {}

  readonly favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  getAll(): FavoritesRepsonse {
    const response = {
      artists: [],
      albums: [],
      tracks: [],
    };

    this.favorites.artists.forEach((artistId) => {
      response.artists.push(this.artistsService.getById(artistId));
    });

    this.favorites.albums.forEach((albumId) => {
      response.albums.push(this.albumsService.getById(albumId));
    });

    this.favorites.tracks.forEach((trackId) => {
      response.tracks.push(this.tracksService.getById(trackId));
    });

    return response;
  }

  addAlbum(id: string) {
    const album = this.albumsService.albums.find((album) => album.id === id);
    if (!album)
      throw new UnprocessableEntityException(EXCEPTION_MESSAGE('Album'));
    this.favorites.albums.push(album.id);
  }

  addArtist(id: string) {
    const artist = this.artistsService.artists.find(
      (artist) => artist.id === id,
    );
    if (!artist)
      throw new UnprocessableEntityException(EXCEPTION_MESSAGE('Artist'));
    this.favorites.artists.push(artist.id);
  }

  addTrack(id: string) {
    const track = this.tracksService.tracks.find((track) => track.id === id);
    if (!track)
      throw new UnprocessableEntityException(EXCEPTION_MESSAGE('Track'));
    this.favorites.tracks.push(track.id);
  }

  removeAlbum(id: string, skipError: boolean = false) {
    const albumIndex = this.favorites.albums.findIndex(
      (albumId) => albumId === id,
    );

    if (albumIndex === -1 && !skipError) {
      throw new NotFoundException(EXCEPTION_MESSAGE('Album'));
    }

    if (albumIndex !== -1) {
      this.favorites.albums.splice(albumIndex, 1);
    }
  }

  removeArtist(id: string) {
    const artistIndex = this.favorites.artists.findIndex(
      (artistId) => artistId === id,
    );

    if (artistIndex === -1) {
      throw new NotFoundException(EXCEPTION_MESSAGE('Artist'));
    }

    this.favorites.artists.splice(artistIndex, 1);
  }

  removeTrack(id: string) {
    const trackIndex = this.favorites.tracks.findIndex((track) => track === id);

    if (trackIndex === -1) {
      throw new NotFoundException(EXCEPTION_MESSAGE('Track'));
    }

    this.favorites.tracks.splice(trackIndex, 1);
  }
}
