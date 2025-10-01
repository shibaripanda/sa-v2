import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit {
  constructor() {
    console.log('AppService start');
  }

  async onModuleInit() {}

  sendMessage(message: string): any {
    console.log(message);
  }
}
