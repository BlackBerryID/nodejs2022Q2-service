import { forwardRef, Module } from '@nestjs/common';
import { ArtistsModule } from 'src/artists/artists.module';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { FavoritesService } from 'src/favorites/favorites.service';
import { TracksModule } from 'src/tracks/tracks.module';
import { TracksService } from 'src/tracks/tracks.service';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';

@Module({
  imports: [
    forwardRef(() => TracksModule),
    forwardRef(() => FavoritesModule),
    forwardRef(() => ArtistsModule),
  ],
  controllers: [AlbumsController],
  providers: [AlbumsService, TracksService, FavoritesService],
  exports: [AlbumsService],
})
export class AlbumsModule {}
