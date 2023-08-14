import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { Organization } from './schema/organization.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Search } from './entities/search.entity';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectModel(Organization.name)
    private organizationModel: mongoose.Model<Organization>,
  ) {}

  async create(organization: Organization): Promise<Organization> {
    const res = await this.organizationModel.create(organization);
    return res;
  }

  async findAll(): Promise<Organization[]> {
    return await this.organizationModel.find();
  }

  async findOne(id: string): Promise<Organization> {
    console.log(id);
    return await this.organizationModel.findById(id);
  }

  async findOneFromName(
    name: string,
    accessCode: string,
    showTime: string,
  ): Promise<Organization> {
    console.log(name, accessCode, showTime);
    return await this.organizationModel.findOne({ name, accessCode, showTime });
  }
}
