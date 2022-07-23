import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryDb {
  artists: Artist[] = [];
  tracks: Track[] = [];
  albums: Album[] = [];
  users: User[] = [];
  favorites: Favorites = {
    artists: [],
    tracks: [],
    albums: [],
  };
}
