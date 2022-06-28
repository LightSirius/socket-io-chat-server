import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import type {
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import type { Server, Socket } from 'socket.io';
import { UserDataInterface } from '../room/interface/user-data.interface';

@WebSocketGateway(3005, { transports: ['websocket'], namespace: 'chat' })
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private socketMap = new Map();

  @SubscribeMessage('join')
  async joinRoom(@MessageBody() data, @ConnectedSocket() socket) {
    socket.join(data.room);
  }

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() data, @ConnectedSocket() client) {
    client.broadcast.emit('message', 'server to client : ' + data);
  }

  async getConnectedUserCount(): Promise<number> {
    const count = await this.server.allSockets();
    return count.size;
  }

  initLogging() {
    setInterval(async () => {
      console.log('[LOG] User count : ' + (await this.getConnectedUserCount()));
      // console.log(this.socketMap);
    }, 10000);
  }

  setUserData(socket: Socket, name: string): void {
    this.socketMap.set(socket, { id: socket.id, name: name });
  }

  afterInit(server: Server): void {
    console.log('after Init');
    this.initLogging();
  }

  handleConnection(socket: Socket): void {
    console.log('[LOG] Connected : ' + socket.id);
    this.setUserData(socket, 'testName');
  }

  handleDisconnect(socket: Socket): void {
    console.log('[LOG] Disconnected : ' + socket.id);
    this.socketMap.delete(socket);
  }
}
