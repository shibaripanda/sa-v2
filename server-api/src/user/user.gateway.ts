import { KafkaService } from 'src/app/kafka.service';
import { WebSocketGateway } from '@nestjs/websockets/decorators/socket-gateway.decorator';
import { SubscribeMessage } from '@nestjs/websockets/decorators/subscribe-message.decorator';
import { Socket } from 'node_modules/socket.io/dist/socket';
import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from './interfaces/user';
import { UniversalJwtGuard } from 'src/guards/universalJwtGuard';
import { MessageBody } from '@nestjs/websockets';

export interface MySocket extends Socket {
  data: {
    user: { userId: string; iat: number; exp: number };
  };
}

@WebSocketGateway({
  cors: { origin: '*' },
})
export class UserGateway {
  constructor(private readonly kafkaService: KafkaService) {}

  @UseGuards(UniversalJwtGuard)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }))
  @SubscribeMessage('getPhotoBuffer')
  async getPhotoBuffer(@MessageBody() messageBody: { photo: string }) {
    console.log('getPhotoBuffer', messageBody);
    return await this.kafkaService.sendAnyReq('getPhotoBuffer_bot', messageBody);
  }

  @UseGuards(UniversalJwtGuard)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }))
  @SubscribeMessage('getPhotos')
  async getPhotos(@CurrentUser() user: User) {
    console.log('getPhotos');
    return await this.kafkaService.sendAnyReq('getPhotos_auth', { _id: user._id });
  }
}
