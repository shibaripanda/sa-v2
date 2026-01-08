import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ShopSchema } from './shop.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Shop', schema: ShopSchema }])],
  providers: [ShopService],
  controllers: [],
  exports: [ShopService],
})
export class ShopModule {}
