import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StatusSchema } from './status.schema';
import { StatusKafkaController } from './status.kafka.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Status', schema: StatusSchema }]),
  ],
  providers: [StatusService],
  controllers: [StatusKafkaController],
  exports: [StatusService],
})
export class StatusModule {}
