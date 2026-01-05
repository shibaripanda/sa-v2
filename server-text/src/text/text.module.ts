import { Module } from '@nestjs/common';
import { TextService } from './text.service';
import { TextKafkaController } from './text.kafka.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TextSchema } from './text.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Text', schema: TextSchema }])],
  providers: [TextService],
  controllers: [TextKafkaController],
})
export class TextModule {}
