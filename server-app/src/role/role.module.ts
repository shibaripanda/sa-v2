import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleSchema } from './role.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Role', schema: RoleSchema }])],
  controllers: [],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
