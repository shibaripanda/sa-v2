import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanySchema } from './company.schema';
import { CompanyKafkaController } from './company.kafka.controller';
import { CompanyAdminKafkaController } from './company.admin.kafka.controller';
import { CompanyAdminService } from './company.admin.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }]),
  ],
  controllers: [CompanyKafkaController, CompanyAdminKafkaController],
  providers: [CompanyService, CompanyAdminService],
  exports: [CompanyService, CompanyAdminService],
})
export class CompanyModule {}
