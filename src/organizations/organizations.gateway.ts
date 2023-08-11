import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { Server } from 'socket.io';
import { Organization } from './schema/organization.schema';

@WebSocketGateway(3001, {
  cors: {
    origin: '*',
  },
})
export class OrganizationsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly organizationsService: OrganizationsService) {}

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
