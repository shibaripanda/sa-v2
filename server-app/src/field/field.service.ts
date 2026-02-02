import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Types } from 'mongoose';
import { Field, FieldDocument } from './field.schema';

@Injectable()
export class FieldService {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    private readonly configService: ConfigService,
    @InjectModel(Field.name) private fieldModel: Model<FieldDocument>,
  ) {}

  async editField(field_id: Types.ObjectId, data: { [key: string]: string }) {
    return await this.fieldModel
      .findOneAndUpdate({ _id: field_id }, data, {
        returnDocument: 'after',
      })
      .lean();
  }

  async deleteField(field_id: Types.ObjectId) {
    return await this.fieldModel.deleteOne({ _id: field_id });
  }

  async deleteManyFields(ids: Types.ObjectId[], session?: ClientSession) {
    await this.fieldModel.deleteMany({ _id: { $in: ids } }, { session });
  }

  async createNewField(session?: ClientSession): Promise<Types.ObjectId> {
    const res = await this.fieldModel.create([{}], {
      session,
    });
    return res[0]._id;
  }

  async createNewFieldsForNewCompany(
    session?: ClientSession,
  ): Promise<Types.ObjectId[]> {
    const stats = [
      {
        name: 'Model',
        onlyNumber: false,
        mustHave: true,
        variants: true,
        data: [],
      },
      {
        name: 'Serial number',
        onlyNumber: false,
        mustHave: true,
        variants: true,
        data: [],
      },
      {
        name: 'Look',
        onlyNumber: false,
        mustHave: true,
        variants: true,
        data: [],
      },
      {
        name: 'Malfunction',
        onlyNumber: false,
        mustHave: true,
        variants: true,
        data: [],
      },
      {
        name: 'Additional information',
        onlyNumber: false,
        mustHave: false,
        variants: true,
        data: [],
      },
      {
        name: 'Client`s name',
        onlyNumber: false,
        mustHave: true,
        variants: true,
        data: [],
      },
      {
        name: 'Contacts',
        onlyNumber: false,
        mustHave: true,
        variants: true,
        data: [],
      },
      {
        name: 'Preliminary cost',
        onlyNumber: true,
        mustHave: true,
        variants: true,
        data: [],
      },
    ];
    const res = await this.fieldModel.create(stats, {
      session,
      ordered: true,
    });
    return res.map((s) => s._id);
  }
}
