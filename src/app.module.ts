import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrganizationsModule } from './organizations/organizations.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SeatsModule } from './seats/seats.module';
import { OrganizationController } from './organizations/organizations.controller';
import { OrganizationsService } from './organizations/organizations.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    OrganizationsModule,
    SeatsModule,
  ],
  controllers: [AppController, OrganizationController],
  providers: [AppService],
})
export class AppModule {}
