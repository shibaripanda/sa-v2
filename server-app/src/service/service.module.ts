import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceSchema } from './service.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Service', schema: ServiceSchema }]),
  ],
  controllers: [],
  providers: [ServiceService],
  exports: [ServiceService],
})
export class ServiceModule {}
