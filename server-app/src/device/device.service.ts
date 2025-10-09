import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Device, DeviceDocument } from './device.schema';

@Injectable()
export class DeviceService {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    private readonly configService: ConfigService,
    @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>,
  ) {}

  async createNewDevice() {
    const res = await this.deviceModel.create({});
    return res._id;
  }
}
