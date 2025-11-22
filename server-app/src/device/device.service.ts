import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Types } from 'mongoose';
import { Device, DeviceDocument } from './device.schema';

@Injectable()
export class DeviceService {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    private readonly configService: ConfigService,
    @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>,
  ) {}

  async deleteManyDevices(ids: Types.ObjectId[], session?: ClientSession) {
    await this.deviceModel.deleteMany({ _id: { $in: ids } }, { session });
  }

  async createNewDevice(session?: ClientSession): Promise<Types.ObjectId> {
    const res = await this.deviceModel.create([{}], {
      session,
    });
    return res[0]._id;
  }

  // async createNewDevice() {
  //   const res = await this.deviceModel.create({});
  //   return res._id;
  // }
}
