import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { SeatsService } from './seats.service';
import { OnModuleInit } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { Room } from './entities/room.entity';
import { Payload } from './entities/payload.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SeatsGateway implements OnModuleInit {
  private readonly PREFIX: string = 'seatPlan';

  @WebSocketServer()
  server: Server;
  socketNew: Socket;
  constructor(private readonly seatsService: SeatsService) {}

  onModuleInit() {
    this.server.on('connection', (socket) => {
      this.socketNew = socket;
    });
  }

  @SubscribeMessage('joinRoom')
  onJoinRequest(@MessageBody() room: Room, @ConnectedSocket() client: Socket) {
    const { accessCode, ShowTime } = room;
    client.join(`${this.PREFIX}_${accessCode}_${ShowTime}`);
    console.log(
      `Client ${client.id} joined room: ${this.PREFIX}_${accessCode}_${ShowTime}`,
    );
  }

  @SubscribeMessage('sendJsonPayload')
  onSend(@MessageBody() room: Payload) {
    const { accessCode, ShowTime, payload } = room;

    console.log(`sent message to: ${this.PREFIX}_${accessCode}_${ShowTime}`);

    this.server
      .to(`${this.PREFIX}_${accessCode}_${ShowTime}`)
      .emit('viewAllDevices', payload);
  }
}
