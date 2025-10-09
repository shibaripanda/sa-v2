import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ShopSchema } from './shop.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Shop', schema: ShopSchema }])],
  providers: [ShopService],
  controllers: [ShopController],
  exports: [ShopService],
})
export class ShopModule {}
