import { Body, Controller, Post } from '@nestjs/common';
import { KafkaService } from 'src/app/kafka.service';
// import { CreateOrderDto } from './dto/createOrder.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly kafkaService: KafkaService) {}

  @Post('/create-order')
  async createOrder(
    @Body()
    data: any,
    // @CurrentUser() user: User,
    // @Ip() ip: string,
  ) {
    console.log(data);
    return await this.kafkaService.sendAnyReq('create-order', data);
    // return { status: true };
  }
}
