import { Module, forwardRef } from '@nestjs/common';
import { AlbumsModule } from 'src/albums/albums.module';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsModule } from 'src/artists/artists.module';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksModule } from 'src/tracks/tracks.module';
import { TracksService } from 'src/tracks/tracks.service';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

@Module({
  imports: [
    forwardRef(() => ArtistsModule),
    forwardRef(() => AlbumsModule),
    forwardRef(() => TracksModule),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService, ArtistsService, AlbumsService, TracksService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
