import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AppGateway } from './app.gateway';

@Controller()
export class KafkaController {
  constructor(private readonly socket: AppGateway) {}

  @EventPattern('newphoto')
  newphoto(@Payload() data: { image: string; _id: string }) {
    console.log(data);
    this.socket.server.to(data._id).emit('fffffff', data);
  }
}
