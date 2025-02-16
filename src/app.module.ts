import { Module } from '@nestjs/common';
import { PopulationModule } from './population/population.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infrastructure/database/database.module';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { GamesModule } from './games/games.module';
import { ImagesModule } from './images/images.module';
import { AchievementsModule } from './achievements/achievements.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    PopulationModule,
    UsersModule,
    AuthenticationModule,
    GamesModule,
    ImagesModule,
    AchievementsModule
  ],
})
export class AppModule {}
