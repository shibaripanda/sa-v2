import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AppGateway } from './app.gateway';
import { KafkaService } from './kafka.service';

@Controller()
export class KafkaController {
  constructor(
    private readonly socket: AppGateway,
    private readonly kafkaService: KafkaService,
  ) {}

  @EventPattern('newPhoto_api')
  newphoto(@Payload() data: { image: string; _id: string; photo: string }) {
    this.socket.server.to(data._id).emit('test', { image: data.image });
  }
}
