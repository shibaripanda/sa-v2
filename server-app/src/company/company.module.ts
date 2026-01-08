import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanySchema } from './company.schema';
import { CompanyKafkaController } from './company.kafka.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }]),
  ],
  controllers: [CompanyKafkaController],
  providers: [CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}
