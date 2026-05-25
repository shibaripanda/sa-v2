import { KafkaService } from 'src/app/kafka.service';
import { WebSocketGateway } from '@nestjs/websockets/decorators/socket-gateway.decorator';
import { SubscribeMessage } from '@nestjs/websockets/decorators/subscribe-message.decorator';
import { Socket } from 'node_modules/socket.io/dist/socket';
import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { UniversalJwtGuard } from 'src/guards/universalJwtGuard';
import { MessageBody } from '@nestjs/websockets';
import { User } from 'src/user/interfaces/user';

export interface MySocket extends Socket {
  data: {
    user: { userId: string; iat: number; exp: number };
  };
}

@WebSocketGateway({
  cors: { origin: '*' },
})
export class OrderGateway {
  constructor(private readonly kafkaService: KafkaService) {}

  @UseGuards(UniversalJwtGuard)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }))
  @SubscribeMessage('analyzPhotos')
  async analyzPhotos(
    @CurrentUser() user: User,
    @MessageBody() messageBody: { photos: string[]; fields: string[]; device: string; leng: string },
  ) {
    return await this.kafkaService.sendAnyReq('analyzPhotos_openai', {
      photos: messageBody.photos,
      fields: messageBody.fields,
      device: messageBody.device,
      leng: messageBody.leng,
    });
  }
}
