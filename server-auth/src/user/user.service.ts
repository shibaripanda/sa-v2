import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model, Types } from 'mongoose';
import { GoogleAuthUser } from './interfaces/GoogleAuthUser';
import { TelegramAuthUser } from './interfaces/TelegramAuthUser';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    console.log('UserService initialized');
  }

  async getUserById(_id: Types.ObjectId) {
    return await this.userModel.findById(_id);
  }

  async updateUserData(_id: Types.ObjectId, data: object) {
    return await this.userModel.updateOne({ _id }, data);
  }

  async getOrCreateTelegramUser(
    user: TelegramAuthUser,
  ): Promise<UserDocument | null> {
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

  async getOrCreateGoogleUser(
    user: GoogleAuthUser,
  ): Promise<UserDocument | null> {
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
