import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Part, PartDocument } from './part.schema';

@Injectable()
export class PartService {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    private readonly configService: ConfigService,
    @InjectModel(Part.name) private partModel: Model<PartDocument>,
  ) {}

  async createNewPart(user_owner_id: string) {
    return await this.partModel.create({ user_owner_id });
  }
}
