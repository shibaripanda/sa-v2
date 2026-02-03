import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceSchema } from './service.schema';
import { ServiceKafkaController } from './service.kafka.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Service', schema: ServiceSchema }]),
  ],
  controllers: [ServiceKafkaController],
  providers: [ServiceService],
  exports: [ServiceService],
})
export class ServiceModule {}
