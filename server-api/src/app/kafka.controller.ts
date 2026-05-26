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
  newphoto(@Payload() data: { _id: string }) {
    this.socket.server.to(data._id).emit('updatePhotos_client');
  }

  @EventPattern('newVoice_api')
  newVoice(@Payload() data: { _id: string }) {
    this.socket.server.to(data._id).emit('get_data_for_new_voice_client');
  }
}
