import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Work, WorkDocument } from './work.schema';
import { Model } from 'mongoose';

@Injectable()
export class WorkService {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    private readonly configService: ConfigService,
    @InjectModel(Work.name) private workModel: Model<WorkDocument>,
  ) {}

  async createNewWork() {
    const res = await this.workModel.create({});
    return res._id;
  }
}
