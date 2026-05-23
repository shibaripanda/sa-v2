import { MiddlewareFn } from 'telegraf';
import { ModuleRef } from '@nestjs/core';
import { UserContext } from '../interfaces/MyContext';
import { KafkaService } from 'src/app/kafka.service';

export const accessControlMiddleware = (): MiddlewareFn<UserContext> => {
  return async (ctx: UserContext, next) => {
    if (!ctx.from || ctx.from.is_bot) return;

    console.log('accessControlMiddleware');

    const moduleRef: ModuleRef = ctx.state.moduleRef;

    const kafkaService = moduleRef.get(KafkaService, { strict: false });

    const res = (await kafkaService.sendAnyReq('getUserByTgId', {
      telegramId: ctx.from.id,
    })) as { user: { _id: string } };

    console.log(res, typeof res);

    if (!res.user) return;

    ctx.user = res.user as { _id: string };

    await next();
  };
};
