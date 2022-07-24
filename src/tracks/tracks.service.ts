import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InMemoryDb } from 'src/db/in-memory-db';
import { NotFoundException } from '@nestjs/common';
import { FavoritesService } from 'src/favorites/favorites.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

const NOT_FOUND_MESSAGE = 'Track not found';

@Injectable()
export class TracksService {
  constructor(
    private readonly db: InMemoryDb,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoriteService: FavoritesService,
  ) {}

  getAll() {
    return this.db.tracks;
  }

  getById(id: string) {
    const track = this.db.tracks.find((track) => track.id === id);
    if (!track) throw new NotFoundException(NOT_FOUND_MESSAGE);
    return track;
  }

  createTrack(createTrackDto: CreateTrackDto) {
    const newTrack: Track = {
      id: uuidv4(),
      albumId: null,
      artistId: null,
      ...createTrackDto,
    };

    this.db.tracks.push({ ...newTrack });
    return newTrack;
  }

  updateTrack(id: string, updateTrackDto: UpdateTrackDto) {
    let updatedTrack = null;
    let trackIndex = null;

    this.db.tracks.forEach((track, index) => {
      if (track.id === id) {
        trackIndex = index;
        updatedTrack = {
          ...track,
          ...updateTrackDto,
        };
      }
    });

    if (updatedTrack === null) {
      throw new NotFoundException(NOT_FOUND_MESSAGE);
    } else {
      this.db.tracks[trackIndex] = { ...updatedTrack };
      return updatedTrack;
    }
  }

  removeTrack(id: string) {
    const trackIndex = this.db.tracks.findIndex((track) => track.id === id);

    if (trackIndex === -1) {
      throw new NotFoundException(NOT_FOUND_MESSAGE);
    } else {
      this.favoriteService.removeTrack(id, true);
      this.db.tracks.splice(trackIndex, 1);
    }
  }
}
