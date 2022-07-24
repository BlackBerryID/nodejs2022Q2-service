import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InMemoryDb } from 'src/db/in-memory-db';
import { NotFoundException } from '@nestjs/common';
import { FavoritesService } from 'src/favorites/favorites.service';
import { TracksService } from 'src/tracks/tracks.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

const NOT_FOUND_MESSAGE = 'Album not found';

@Injectable()
export class AlbumsService {
  constructor(
    private readonly db: InMemoryDb,
    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}

  getAll() {
    return this.db.albums;
  }

  getById(id: string) {
    const album = this.db.albums.find((album) => album.id === id);
    if (!album) throw new NotFoundException(NOT_FOUND_MESSAGE);
    return album;
  }

  createAlbum(createAlbumDto: CreateAlbumDto) {
    const newAlbum: Album = {
      id: uuidv4(),
      ...createAlbumDto,
    };

    this.db.albums.push({ ...newAlbum });
    return newAlbum;
  }

  updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto) {
    let updatedAlbum = null;
    let albumIndex = null;

    this.db.albums.forEach((album, index) => {
      if (album.id === id) {
        albumIndex = index;
        updatedAlbum = {
          ...album,
          ...updateAlbumDto,
        };
      }
    });

    if (albumIndex === null) {
      throw new NotFoundException(NOT_FOUND_MESSAGE);
    } else {
      this.db.albums[albumIndex] = { ...updatedAlbum };
      return updatedAlbum;
    }
  }

  removeAlbum(id: string) {
    let albumIndex = null;
    let album = null;

    this.db.albums.forEach((album, index) => {
      if (album.id === id) {
        albumIndex = index;
        album = album;
      }
    });

    if (album === null) {
      throw new NotFoundException(NOT_FOUND_MESSAGE);
    } else {
      this.removeAlbumIdFromTracks(album.id);
      this.favoritesService.removeAlbum(album.id, true);
      // remove album
      this.db.albums.splice(albumIndex, 1);
    }
  }

  private removeAlbumIdFromTracks(id: string) {
    const tracks = this.tracksService.getAll();
    tracks.forEach((track) => {
      if (track.albumId === id) {
        this.tracksService.updateTrack(track.id, { albumId: null });
      }
    });
  }
}
