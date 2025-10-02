import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export type HistoryLogin = { date: number; ip: string; location: string };

@Schema({ timestamps: true })
export class User {
  @Prop({ unique: true, sparse: true })
  telegramId?: number;

  @Prop({ unique: true, sparse: true })
  email?: string;

  @Prop()
  name: string;

  @Prop()
  telegramUserName: string;

  @Prop({ default: '12h' })
  timeLiveToken: string;

  @Prop({ default: [] })
  historyLogin: [HistoryLogin];
}

export const UserSchema = SchemaFactory.createForClass(User);

// UserSchema.index({ subscriptionExpiresAt: 1, status: 1 });
