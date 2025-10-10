import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Types } from 'mongoose';
import { Role, RoleDocument } from './role.schema';

@Injectable()
export class RoleService {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    private readonly configService: ConfigService,
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
  ) {}

  async createNewRole(session?: ClientSession): Promise<Types.ObjectId> {
    const res = await this.roleModel.create([{ name: 'Owner' }], {
      session,
    });
    return res[0]._id;
  }

  // async createNewRole() {
  //   const res = await this.roleModel.create({ name: 'Owner' });
  //   return res._id;
  // }
}
