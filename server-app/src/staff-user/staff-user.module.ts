import { Module } from '@nestjs/common';
import { StaffUserService } from './staff-user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StaffUserSchema } from './staff-user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'StaffUser', schema: StaffUserSchema }]),
  ],
  controllers: [],
  providers: [StaffUserService],
  exports: [StaffUserService],
})
export class StaffUserModule {}
