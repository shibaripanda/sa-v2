import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserAdminGateway } from './user.admin.gateway';

@Module({
  controllers: [UserController],
  providers: [UserAdminGateway],
  exports: [],
})
export class UserModule {}
