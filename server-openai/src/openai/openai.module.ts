import { Module } from '@nestjs/common';
import { OpenAIService } from './openai.service';
import { OpenAIKafkaController } from './openai.kafka.controller';
import { OpenAIProvider } from './openai.provider';

@Module({
  imports: [],
  providers: [OpenAIProvider, OpenAIService],
  controllers: [OpenAIKafkaController],
})
export class OpenAIModule {}
