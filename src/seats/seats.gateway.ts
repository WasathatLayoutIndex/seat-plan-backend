/* eslint-disable prettier/prettier */
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
    const { accessCode, showTime } = room;
    client.join(`${this.PREFIX}_${accessCode}_${showTime}`);
    console.log(
      `Client ${client.id} joined room: ${this.PREFIX}_${accessCode}_${showTime}`,
    );
  }

  @SubscribeMessage('jsonPayload')
  onSend(@MessageBody() room: Payload) {
    const { accessCode, showTime, payload } = room;

    console.log(`sent message to: ${this.PREFIX}_${accessCode}_${showTime}`);

    console.log(`payload: ${JSON.stringify(payload)}`);

    this.server
      .to(`${this.PREFIX}_${accessCode}_${showTime}`)
      .emit('jsonPayload', payload);
  }
}
