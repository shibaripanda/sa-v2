import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from './role.schema';

@Injectable()
export class RoleService {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    private readonly configService: ConfigService,
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
  ) {}

  async createNewRole() {
    const res = await this.roleModel.create({ name: 'Owner' });
    return res._id;
  }
}
