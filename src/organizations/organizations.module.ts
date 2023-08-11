import { Module } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { OrganizationsGateway } from './organizations.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationSchema } from './schema/organization.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Organization', schema: OrganizationSchema },
    ]),
  ],
  providers: [OrganizationsGateway, OrganizationsService],
})
export class OrganizationsModule {}
