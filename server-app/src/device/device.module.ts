import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviceSchema } from './device.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Device', schema: DeviceSchema }]),
  ],
  controllers: [],
  providers: [DeviceService],
  exports: [DeviceService],
})
export class DeviceModule {}
