import {
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
  async handleMessage(client: Socket, data: string) {
    console.log(data);
    console.log(Socket);
    this.server.emit('message', 'server to client : ' + data);
  }

  afterInit(client) {
    console.log('after Init');
    console.log(client);
  }

  handleDisconnect(client) {
    console.log(client);
  }

  handleConnection(server) {
    console.log('connected');
    console.log(server);
  }
}
