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

@Module({
  imports: [],
  controllers: [AppController, UsersController, ArtistsController, TracksController, AlbumsController],
  providers: [AppService, UsersService, ArtistsService, TracksService, AlbumsService],
})
export class AppModule {}
