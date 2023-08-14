import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { Organization } from './schema/organization.schema';

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
    const res = await this.organizationModel.findOneFromName(
      name,
      accessCode,
      showTime,
    );

    if (!res) {
      throw new NotFoundException('Organization not found');
    }
    return res;
  }
}
