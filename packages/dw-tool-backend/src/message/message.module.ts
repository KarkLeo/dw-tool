import { forwardRef, Module } from '@nestjs/common'
import { MessageGateway } from './message.gateway'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConnectionEntity } from './connection/connection.entity'
import { ConnectionService } from './connection/connection.service'
import { UserModule } from '../user/user.module'
import { NotificationEntity } from './notification/notification.entity'
import { NotificationService } from './notification/notification.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([ConnectionEntity]),
    TypeOrmModule.forFeature([NotificationEntity]),
    forwardRef(() => UserModule),
  ],
  providers: [ConnectionService, NotificationService, MessageGateway],
  exports: [MessageGateway],
})
export class MessageModule {}

// todo 1: create dispacher for notification
// todo 2: create notification response
