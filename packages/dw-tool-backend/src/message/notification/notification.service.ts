import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { NotificationEntity } from './notification.entity'
import { UserService } from '../../user/user.service'
import { UserEntity } from '../../user/user.entity'
import { NotificationDataType } from './types/notificationData.types'

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly notificationRepository: Repository<NotificationEntity>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async findAll(currentUser: UserEntity): Promise<NotificationEntity[]> {
    return await this.notificationRepository.find({
      where: {
        to: { id: currentUser.id },
      },
      order: {
        createdAt: 'DESC',
      },
    })
  }

  async findUnread(currentUser: UserEntity): Promise<NotificationEntity[]> {
    return await this.notificationRepository.find({
      where: {
        to: { id: currentUser.id },
        read: false,
      },
      order: {
        createdAt: 'DESC',
      },
    })
  }

  async create(
    notification: NotificationDataType,
    to: UserEntity,
    from?: UserEntity,
  ): Promise<NotificationEntity> {
    const newNotification = new NotificationEntity()
    newNotification.type = notification.type
    newNotification.data = notification.data
    newNotification.to = to
    if (from) {
      newNotification.from = from
    }
    return await this.notificationRepository.save(newNotification)
  }

  async markAsRead(notificationId: number): Promise<NotificationEntity> {
    const notification = await this.notificationRepository.findOne({
      where: {
        id: notificationId,
      },
    })
    notification.read = true
    return await this.notificationRepository.save(notification)
  }
}
