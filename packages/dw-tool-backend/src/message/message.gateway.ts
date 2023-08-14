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
import { UserEntity } from '../user/user.entity'
import { ConnectionService } from './connection/connection.service'
import { NotificationService } from './notification/notification.service'
import { NotificationEntity } from './notification/notification.entity'
import { ConnectionEntity } from './connection/connection.entity'

@WebSocketGateway({
  namespace: 'message',
  cors: true,
})
export class MessageGateway implements OnGatewayConnection {
  constructor(
    private readonly connectionService: ConnectionService,
    private readonly notificationService: NotificationService,
  ) {}

  @WebSocketServer()
  server: Server

  @UseGuards(AuthGuard)
  async handleConnection(client: Socket) {
    if (client.handshake.auth.token) {
      const connection = await this.connectionService.createConnection(
        '_ ' + client.handshake.auth.token, // todo reafctor this
        client.id,
      )
      await this.emitNotificationsForConnections([connection])
    }
  }

  async handleDisconnect(client: Socket) {
    const connectionId = client.id
    await this.connectionService.deleteConnection(connectionId)
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: any) {
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

  async sendAllNotificationsForUser(user: UserEntity) {
    const connections = await this.connectionService.findConnectionsByUser(
      user.id,
    )

    await this.emitNotificationsForConnections(connections)
  }

  async send(notification: NotificationEntity): Promise<void> {
    const connections = await this.connectionService.findConnectionsByUser(
      notification.to.id,
    )

    await this.emitNotificationsForConnections(connections)
  }

  async emitNotificationsForConnections(connections: ConnectionEntity[]) {
    await Promise.all(
      connections.map(async (connection) => {
        this.server.to(connection.connectionId).emit('message', {
          notifications: await this.notificationService.findAll(
            connection.user,
          ),
        })
      }),
    )
  }

  async notify(notifications: NotificationEntity[]): Promise<void> {
    await this.notificationService.saveNotifications(notifications)
    const connections = await this.connectionService.findConnectionsByUsers(
      this.notificationService.getUsersByNotifications(notifications),
    )
    await this.emitNotificationsForConnections(connections)
  }
}
