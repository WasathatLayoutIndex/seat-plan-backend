import { Controller, Get, Param, Header } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { Organization } from './schema/organization.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Search } from './entities/search.entity';

@Controller('org')
export class OrganizationController {
  constructor(
    // @InjectModel(Organization.name)
    private organizationModel: OrganizationsService,
  ) {}

  @Get(':name/:accessCode/:showTime')
  async findOneOrg(
    @Param('name') name: string,
    @Param('accessCode') accessCode: string,
    @Param('showTime') showTime: string,
  ): Promise<Organization> {
    console.log(name, accessCode, showTime);
    return await this.organizationModel.findOneFromName(
      name,
      accessCode,
      showTime,
    );
  }
}
