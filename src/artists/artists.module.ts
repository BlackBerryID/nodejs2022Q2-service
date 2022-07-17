import { Module, forwardRef } from '@nestjs/common';
import { AlbumsModule } from 'src/albums/albums.module';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { FavoritesService } from 'src/favorites/favorites.service';
import { TracksModule } from 'src/tracks/tracks.module';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';

@Module({
  imports: [
    forwardRef(() => AlbumsModule),
    forwardRef(() => TracksModule),
    forwardRef(() => FavoritesModule),
  ],
  controllers: [ArtistsController],
  providers: [ArtistsService, FavoritesService],
  exports: [ArtistsService],
})
export class ArtistsModule {}
