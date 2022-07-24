import { Module, forwardRef } from '@nestjs/common';
import { AlbumsModule } from 'src/albums/albums.module';
import { ArtistsModule } from 'src/artists/artists.module';
import { DbModule } from 'src/db/db.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

@Module({
  imports: [
    DbModule,
    forwardRef(() => ArtistsModule),
    forwardRef(() => AlbumsModule),
    forwardRef(() => TracksModule),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
