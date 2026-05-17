import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthAdminController } from './auth.admin.controller';

@Module({
  controllers: [AuthController, AuthAdminController],
})
export class AuthModule {}
