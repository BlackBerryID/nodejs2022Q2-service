import { Injectable } from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksService } from 'src/tracks/tracks.service';

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

  // createAlbum(createAlbumDto: CreateAlbumDto) {
  //   const requiredProps = ['name', 'year', 'artistId'];

  //   checkAllRequiredProps(
  //     createAlbumDto,
  //     'Name, year amd artistId are required',
  //     requiredProps,
  //   );

  //   const tempAlbumData: Album = {
  //     id: uuidv4(),
  //     ...createAlbumDto,
  //   };

  //   this.albums.push({ ...tempAlbumData });
  //   return tempAlbumData;
  // }

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
