import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { RoomModule } from '../room/room.module';

@Module({
  imports: [RoomModule],
  providers: [EventsGateway],
})
export class EventsModule {}
