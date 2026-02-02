import { Module } from '@nestjs/common';
import { FieldService } from './field.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FieldSchema } from './field.schema';
import { FieldKafkaController } from './field.kafka.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Field', schema: FieldSchema }]),
  ],
  controllers: [FieldKafkaController],
  providers: [FieldService],
  exports: [FieldService],
})
export class FieldModule {}
