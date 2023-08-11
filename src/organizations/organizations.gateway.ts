import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { Server } from 'socket.io';
import { Organization } from './schema/organization.schema';
import { Socket } from 'socket.io';
@WebSocketGateway(3001, {
  cors: {
    origin: '*',
  },
})
export class OrganizationsGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private readonly organizationsService: OrganizationsService) {}

  async handleConnection(client: Socket){
    const allOrganizations = await this.organizationsService.findAll();
    client.emit('allOrganizations', allOrganizations);
  }


  @SubscribeMessage('createOrganization')
  async create(
    @MessageBody() organization: CreateOrganizationDto,
  ): Promise<Organization> {
    const newOrganization = await this.organizationsService.create(
      organization,
    );

    this.server.emit(
      'allOrganizations',
      await this.organizationsService.findAll(),
    );

    return newOrganization;
  }

  @SubscribeMessage('findAllOrganizations')
  findAll() {
    return this.organizationsService.findAll();
  }
}