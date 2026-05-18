import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserAdminGateway } from './user.admin.gateway';

@Module({
  controllers: [UserController],
  providers: [UserService, UserAdminGateway],
  exports: [UserService],
})
export class UserModule {}
