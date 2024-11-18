import { Module } from '@nestjs/common';
import { PopulationModule } from './population/population.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PopulationModule,
  ],
})
export class AppModule {}
