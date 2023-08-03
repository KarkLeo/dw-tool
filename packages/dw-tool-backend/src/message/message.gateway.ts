import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Socket, Server } from 'socket.io'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from '../user/guards/auth.guard'
import { User } from '../user/decorators/user.decorator'
import { UserEntity } from '../user/user.entity'
import { ConnectionService } from './connection/connection.service'

@WebSocketGateway({
  namespace: 'message',
})
export class MessageGateway implements OnGatewayConnection {
  constructor(private readonly connectionService: ConnectionService) {}

  @WebSocketServer()
  server: Server

  @UseGuards(AuthGuard)
  async handleConnection(client: Socket) {
    const connection = await this.connectionService.createConnection(
      client.handshake.headers.authorization,
      client.id,
    )
    console.log('Connection created', connection)
  }

  async handleDisconnect(client: Socket) {
    const connection = await this.connectionService.deleteConnection(client.id)
    console.log('Connection deleted', connection)
  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() message: any,
    @ConnectedSocket() _client: Socket,
  ) {
    this.server.emit('message', {
      message,
      time: new Date().toDateString(),
    })
  }

  async sendMessageToUser(user: UserEntity, message: any) {
    const connections = await this.connectionService.findConnectionsByUser(
      user.id,
    )

    connections.forEach((connection) => {
      this.server.to(connection.connectionId).emit('message', {
        message,
        time: new Date().toDateString(),
      })
    })
  }
}
