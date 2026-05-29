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

export interface GetOrders {
  page: number;
  limit: number;
  compId: string;
  serviceId: string;
}

@WebSocketGateway({
  cors: { origin: '*' },
})
export class OrderGateway {
  constructor(private readonly kafkaService: KafkaService) {}

  @UseGuards(UniversalJwtGuard)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }))
  @SubscribeMessage('createOrder')
  async createOrder(@CurrentUser() user: User, @MessageBody() messageBody: object) {
    console.log(user, messageBody);
    return await this.kafkaService.sendAnyReq('createOrder_order', messageBody);
  }

  @UseGuards(UniversalJwtGuard)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }))
  @SubscribeMessage('getOrders')
  async getOrders(@CurrentUser() user: User, @MessageBody() messageBody: GetOrders) {
    console.log(user, messageBody);
    return await this.kafkaService.sendAnyReq('getOrders_order', messageBody);
  }

  @UseGuards(UniversalJwtGuard)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }))
  @SubscribeMessage('analyzVoice')
  async analyzVoice(
    @CurrentUser() user: User,
    @MessageBody() messageBody: { voice: string; fields: string[]; device: string; leng: string },
  ) {
    return await this.kafkaService.sendAnyReq('analyzVoice_openai', {
      voice: messageBody.voice,
      fields: messageBody.fields,
      device: messageBody.device,
      leng: messageBody.leng,
    });
  }

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
