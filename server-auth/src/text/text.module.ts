import { Module } from '@nestjs/common';
import { TextService } from './text.service';
import { TextController } from './text.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TextSchema } from './text.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Text', schema: TextSchema }])],
  providers: [TextService],
  controllers: [TextController],
})
export class TextModule {}
