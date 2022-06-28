import { IsNumber, IsString } from 'class-validator';

export class ChangeRoomDto {
  @IsString()
  readonly id: string;
  @IsString()
  readonly roomName: string;
}
