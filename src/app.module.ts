import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { RoomModule } from './room/room.module';

@Module({
  imports: [EventsModule, RoomModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
