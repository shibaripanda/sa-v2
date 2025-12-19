import { Module } from '@nestjs/common';
import { TextController } from './text.controller';

@Module({
  controllers: [TextController],
})
export class TextModule {}
