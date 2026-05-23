import { UsePipes, ValidationPipe } from '@nestjs/common';
import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { GetUsersAdminDto } from 'src/user/dto/getUsersAdmin.dto';
import { KafkaService } from './kafka.service';

export interface MySocket extends Socket {
  data: {
    user: { userId: string; iat: number; exp: number };
  };
}

@WebSocketGateway({
  cors: { origin: '*' },
})
export class AppAdminGateway {
  constructor(private kafkaService: KafkaService) {}

  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }))
  @SubscribeMessage('getCompaniesAdmin')
  async getCompaniesAdmin(@MessageBody() messageBody: GetUsersAdminDto) {
    console.log(messageBody);
    return await this.kafkaService.sendAnyReq('getCompaniesAdmin', messageBody);
  }
}
