import { Module } from '@nestjs/common';
import { UserStaffGateway } from './userStaff.gateway';

@Module({
  providers: [UserStaffGateway],
  exports: [],
})
export class UserStaffModule {}
