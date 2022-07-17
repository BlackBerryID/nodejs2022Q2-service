import { Injectable } from '@nestjs/common';
import { NotFoundException } from 'src/exceptions/not-found';
import { checkAllRequiredProps } from 'src/utils/check-all-required-props';
import { checkAllowedProps } from 'src/utils/check-allowed-props';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

const NOT_FOUND_MESSAGE = 'Track not found';

@Injectable()
export class TracksService {
  readonly tracks: Track[] = [];

  getAll() {
    return this.tracks;
  }

  getById(id: string) {
    const track = this.tracks.find((track) => track.id === id);
    if (!track) throw new NotFoundException(NOT_FOUND_MESSAGE);
    return track;
  }

  createTrack(createTrackDto: CreateTrackDto) {
    const requiredProps = ['name', 'artistId', 'albumId', 'duration'];

    checkAllRequiredProps(
      createTrackDto,
      'Name, artistId, albumId and duration are required',
      requiredProps,
    );

    const tempTrackData: Track = {
      id: uuidv4(),
      ...createTrackDto,
    };

    this.tracks.push({ ...tempTrackData });
    return tempTrackData;
  }

  updateTrack(id: string, updateTrackDto: UpdateTrackDto) {
    const allowedProps = ['name', 'artistId', 'albumId', 'duration'];

    checkAllowedProps(updateTrackDto, allowedProps);

    let tempTrackData = null;
    let trackIndex = null;

    this.tracks.forEach((track, index) => {
      if (track.id === id) {
        trackIndex = index;
        tempTrackData = {
          ...track,
          ...updateTrackDto,
        };
      }
    });

    if (trackIndex === null) {
      throw new NotFoundException(NOT_FOUND_MESSAGE);
    } else {
      this.tracks[trackIndex] = { ...tempTrackData };
      return tempTrackData;
    }
  }

  removeTrack(id: string) {
    let trackIndex = null;

    this.tracks.forEach((track, index) => {
      if (track.id === id) {
        trackIndex = index;
      }
    });

    if (trackIndex === null) {
      throw new NotFoundException(NOT_FOUND_MESSAGE);
    } else {
      this.tracks.splice(trackIndex, 1);
    }
  }
}
