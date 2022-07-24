import { forwardRef, Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';

@Module({
  imports: [DbModule, forwardRef(() => FavoritesModule)],
  controllers: [TracksController],
  providers: [TracksService],
  exports: [TracksService],
})
export class TracksModule {}
