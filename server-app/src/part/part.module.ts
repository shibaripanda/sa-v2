import { Module } from '@nestjs/common';
import { PartService } from './part.service';
import { PartSchema } from './part.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Part', schema: PartSchema }])],
  providers: [PartService],
  controllers: [],
  exports: [PartService],
})
export class PartModule {}
