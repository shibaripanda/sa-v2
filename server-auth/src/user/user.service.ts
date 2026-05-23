import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { GoogleAuthUser } from './interfaces/GoogleAuthUser';
import { TelegramAuthUser } from './interfaces/TelegramAuthUser';
import { AppKafkaService } from 'src/app/app.kafka.service';
import { ObjID } from './interfaces/ObjID';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private appKafkaService: AppKafkaService,
  ) {
    console.log('UserService initialized');
  }

  async getUserByTgId(telegramId: number) {
    return await this.userModel.findOne({ telegramId }, { _id: 1 });
  }

  async getUsersAdmin(query: { page: number; limit: number }) {
    const { page, limit } = query;

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.userModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),

      this.userModel.countDocuments(),
    ]);

    return {
      items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getUserById(_id: ObjID) {
    return await this.userModel.findById(_id);
  }

  async deleteAccount(_id: ObjID) {
    try {
      const res = await this.appKafkaService.deleteAccount(_id);
      if (res) await this.userModel.deleteOne({ _id });
      return true;
    } catch {
      throw new HttpException('Kafka deleteAccount failed', HttpStatus.BAD_GATEWAY);
    }
  }

  async updateUserData(_id: ObjID, data: object) {
    return await this.userModel.updateOne({ _id }, data);
  }

  async getTelegramUser(user: TelegramAuthUser): Promise<UserDocument | null> {
    if (!user) return null;

    const ex = await this.userModel.findOne({ telegramId: user.id });
    if (ex) {
      ex.telegramUserName = user.username ?? '';
      await ex.save();
      return ex;
    }
    return null;
  }

  async getGoogleUser(user: GoogleAuthUser): Promise<UserDocument | null> {
    if (!user) return null;

    const ex = await this.userModel.findOne({ email: user.email });
    if (ex) {
      return ex;
    }
    return null;
  }

  async getOrCreateTelegramUser(user: TelegramAuthUser): Promise<UserDocument | null> {
    if (!user) return null;

    const ex = await this.userModel.findOne({ telegramId: user.id });
    if (ex) {
      ex.telegramUserName = user.username ?? '';
      await ex.save();
      return ex;
    }

    const created = new this.userModel({
      telegramId: user.id,
      telegramUserName: user.username ?? '',
      name: user.first_name + (user.last_name ? ' ' + user.last_name : ''),
    });
    return created.save();
  }

  async getOrCreateGoogleUser(user: GoogleAuthUser): Promise<UserDocument | null> {
    if (!user) return null;

    const ex = await this.userModel.findOne({ email: user.email });
    if (ex) {
      return ex;
    }
    const created = new this.userModel({
      email: user.email,
      name: user.name ?? '',
    });
    return created.save();
  }
}
