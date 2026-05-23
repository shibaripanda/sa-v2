import { JwtService } from '@nestjs/jwt';
import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

export interface MySocket extends Socket {
  data: {
    user: { _id: string; iat: number; exp: number; name: string };
  };
}

@WebSocketGateway({
  cors: { origin: '*' },
})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private jwt: JwtService) {}

  @WebSocketServer()
  server!: Server;

  async handleConnection(client: MySocket) {
    const token: string = client.handshake.auth?.token as string;
    if (!token) {
      client.disconnect();
      return;
    }
    const user: { _id: string; iat: number; exp: number; name: string } = this.jwt.verify(token);
    if (!user) {
      client.disconnect();
      return;
    }
    client.data.user = user;
    await client.join(user._id);
    console.log('connected:', client.id, user.name);
  }

  handleDisconnect(client: MySocket) {
    console.log('disconnected:', client.id, client.data.user._id);
  }
}
