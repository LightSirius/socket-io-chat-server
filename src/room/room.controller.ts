import { Body, Controller, Post } from '@nestjs/common';
import { RoomService } from './room.service';
import { ChangeRoomDto } from './dto/change-room.dto';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}
  @Post('change')
  changeRoom(@Body() data: ChangeRoomDto) {
    return this.roomService.changeRoom(data);
  }
}
