import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserAdminGateway } from './user.admin.gateway';
import { UserGateway } from './user.gateway';

@Module({
  controllers: [UserController],
  providers: [UserAdminGateway, UserGateway],
  exports: [],
})
export class UserModule {}
