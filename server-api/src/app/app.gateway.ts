import { JwtService } from '@nestjs/jwt';
import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket } from 'socket.io';

export interface MySocket extends Socket {
  data: {
    user: { userId: string; iat: number; exp: number };
  };
}

@WebSocketGateway({
  cors: { origin: '*' },
})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private jwt: JwtService) {}

  @WebSocketServer()
  // server: Server;
  handleConnection(client: MySocket) {
    const token: string = client.handshake.auth?.token as string;
    if (!token) {
      client.disconnect();
      return;
    }
    const user: { userId: string; iat: number; exp: number } = this.jwt.verify(token);
    if (!user) {
      client.disconnect();
      return;
    }
    client.data.user = user;
    console.log('connected:', client.id, user.userId);
  }

  handleDisconnect(client: MySocket) {
    console.log('disconnected:', client.id, client.data.user.userId);
  }
}
