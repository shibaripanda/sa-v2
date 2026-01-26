import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviceSchema } from './device.schema';
import { DeviceKafkaController } from './device.kafka.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Device', schema: DeviceSchema }]),
  ],
  controllers: [DeviceKafkaController],
  providers: [DeviceService],
  exports: [DeviceService],
})
export class DeviceModule {}
