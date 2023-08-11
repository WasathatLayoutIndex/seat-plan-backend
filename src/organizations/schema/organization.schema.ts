import { Schema } from '@nestjs/mongoose';
import { Prop } from '@nestjs/mongoose';
import { SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Organization {
  @Prop()
  name: string;

  @Prop()
  accessCode: string;

  @Prop()
  showTime: string;

  @Prop()
  seatPlan: string[];
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
