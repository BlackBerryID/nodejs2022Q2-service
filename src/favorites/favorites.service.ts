import { Injectable } from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { UnprocessableEntityException } from 'src/exceptions/unprocessable-entity';
import { TracksService } from 'src/tracks/tracks.service';

const EXCEPTION_MESSAGE = (entity: string) => `${entity} not found`;

@Injectable()
export class FavoritesService {
  constructor(
    private artistsService: ArtistsService,
    private albumsService: AlbumsService,
    private tracksService: TracksService,
  ) {}

  private readonly favorites: Favorites = {
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
    this.favorites.albums.push(artist.id);
  }

  addTrack(id: string) {
    const track = this.tracksService.tracks.find((track) => track.id === id);
    if (!track)
      throw new UnprocessableEntityException(EXCEPTION_MESSAGE('Track'));
    this.favorites.albums.push(track.id);
  }

  // removeAlbum(id: string) {
  //   let albumIndex = null;

  //   this.albums.forEach((Album, index) => {
  //     if (Album.id === id) {
  //       albumIndex = index;
  //     }
  //   });

  //   if (albumIndex === null) {
  //     throw new NotFoundException(NOT_FOUND_MESSAGE);
  //   } else {
  //     this.albums.splice(albumIndex, 1);
  //   }
  // }
}
