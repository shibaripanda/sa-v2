import { Module } from '@nestjs/common';
import { WorkService } from './work.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkSchema } from './work.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Work', schema: WorkSchema }])],
  controllers: [],
  providers: [WorkService],
  exports: [WorkService],
})
export class WorkModule {}
