import { KafkaService } from 'src/app/kafka.service';
import { WebSocketGateway } from '@nestjs/websockets/decorators/socket-gateway.decorator';
import { SubscribeMessage } from '@nestjs/websockets/decorators/subscribe-message.decorator';
import { MessageBody } from '@nestjs/websockets';
import { Socket } from 'node_modules/socket.io/dist/socket';
import { GetUsersAdminDto } from './dto/getUsersAdmin.dto';
import { UsePipes } from '@nestjs/common';

export interface MySocket extends Socket {
  data: {
    user: { userId: string; iat: number; exp: number };
  };
}

@WebSocketGateway({
  cors: { origin: '*' },
})
export class UserAdminGateway {
  constructor(private readonly kafkaService: KafkaService) {}

  @UsePipes()
  @SubscribeMessage('getUsersAdmin')
  async getUsersAdmin(@MessageBody() messageBody: GetUsersAdminDto) {
    console.log(messageBody);
    return await this.kafkaService.sendAnyReq('getUsersAdmin', messageBody);
  }
}
