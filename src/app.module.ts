import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { ArtistsController } from './artists/artists.controller';
import { ArtistsService } from './artists/artists.service';
import { TracksController } from './tracks/tracks.controller';
import { TracksService } from './tracks/tracks.service';
import { AlbumsController } from './albums/albums.controller';
import { AlbumsService } from './albums/albums.service';
import { FavoritesController } from './favorites/favorites.controller';
import { FavoritesService } from './favorites/favorites.service';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { TracksModule } from './tracks/tracks.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [ArtistsModule, AlbumsModule, TracksModule, FavoritesModule],
  controllers: [
    AppController,
    UsersController,
    // ArtistsController,
    // TracksController,
    // AlbumsController,
    // FavoritesController,
  ],
  providers: [
    AppService,
    UsersService,
    // ArtistsService,
    // TracksService,
    // AlbumsService,
    // FavoritesService,
  ],
})
export class AppModule {}
