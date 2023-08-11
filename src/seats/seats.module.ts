import { Module } from '@nestjs/common';
import { SeatsService } from './seats.service';
import { SeatsGateway } from './seats.gateway';

@Module({
  providers: [SeatsGateway, SeatsService],
})
export class SeatsModule {}
