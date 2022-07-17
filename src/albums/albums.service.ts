import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { NotFoundException } from 'src/exceptions/not-found';
import { FavoritesService } from 'src/favorites/favorites.service';
import { TracksService } from 'src/tracks/tracks.service';
import { checkAllRequiredProps } from 'src/utils/check-all-required-props';
import { checkAllowedProps } from 'src/utils/check-allowed-props';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

const NOT_FOUND_MESSAGE = 'Album not found';

@Injectable()
export class AlbumsService {
  constructor(
    @Inject(forwardRef(() => TracksService))
    @Inject(forwardRef(() => FavoritesService))
    private readonly tracksService: TracksService,
    private readonly favoritesService: FavoritesService,
  ) {}

  readonly albums: Album[] = [];

  getAll() {
    return this.albums;
  }

  getById(id: string) {
    const album = this.albums.find((album) => album.id === id);
    if (!album) throw new NotFoundException(NOT_FOUND_MESSAGE);
    return album;
  }

  createAlbum(createAlbumDto: CreateAlbumDto) {
    const requiredProps = ['name', 'year', 'artistId'];

    checkAllRequiredProps(
      createAlbumDto,
      'Name, year amd artistId are required',
      requiredProps,
    );

    const tempAlbumData: Album = {
      id: uuidv4(),
      ...createAlbumDto,
    };

    this.albums.push({ ...tempAlbumData });
    return tempAlbumData;
  }

  updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto) {
    const allowedProps = ['name', 'year', 'artistId'];

    checkAllowedProps(updateAlbumDto, allowedProps);

    let tempAlbumData = null;
    let albumIndex = null;

    this.albums.forEach((album, index) => {
      if (album.id === id) {
        albumIndex = index;
        tempAlbumData = {
          ...album,
          ...updateAlbumDto,
        };
      }
    });

    if (albumIndex === null) {
      throw new NotFoundException(NOT_FOUND_MESSAGE);
    } else {
      this.albums[albumIndex] = { ...tempAlbumData };
      return tempAlbumData;
    }
  }

  removeAlbum(id: string) {
    let albumIndex = null;
    let tempAlbumData = null;

    this.albums.forEach((album, index) => {
      if (album.id === id) {
        albumIndex = index;
        tempAlbumData = album;
      }
    });

    if (albumIndex === null) {
      throw new NotFoundException(NOT_FOUND_MESSAGE);
    } else {
      // set track's artistId to null
      const track = this.tracksService.tracks.find(
        (track) => track.albumId === tempAlbumData.id,
      );
      if (track !== undefined) {
        this.tracksService.updateTrack(track.id, { albumId: null });
      }

      // remove artist form favorites
      const albumId = this.favoritesService.favorites.albums.find(
        (albumId) => albumId === tempAlbumData.id,
      );
      if (albumId !== undefined) {
        this.favoritesService.removeAlbum(tempAlbumData.id);
      }

      // remove artist
      this.albums.splice(albumIndex, 1);
    }
  }
}
