import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Socket } from 'net';

@WebSocketGateway(3005, { transports: ['websocket'], namespace: 'chat' })
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() data, @ConnectedSocket() client) {
    this.server.emit('message', 'server to client : ' + data);
  }

  async getConnectedUserCount(): Promise<number> {
    const count = await this.server.allSockets();
    return count.size;
  }

  initLogging() {
    setInterval(async () => {
      console.log('[LOG] User count : ' + (await this.getConnectedUserCount()));
    }, 10000);
  }

  afterInit(server) {
    console.log('after Init');
    this.initLogging();
  }

  handleDisconnect(client) {
    console.log('[LOG] Disconnected : ' + client.id);
  }

  handleConnection(client) {
    console.log('[LOG] Connected : ' + client.id);
  }
}
