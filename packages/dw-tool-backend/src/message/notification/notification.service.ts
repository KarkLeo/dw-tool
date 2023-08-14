import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { NotificationEntity } from './notification.entity'
import { UserEntity } from '../../user/user.entity'

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly notificationRepository: Repository<NotificationEntity>,
  ) {}

  async findAll(user: UserEntity): Promise<NotificationEntity[]> {
    return await this.notificationRepository.find({
      relations: ['from'],
      where: {
        to: { id: user.id },
      },
      order: {
        createdAt: 'DESC',
      },
    })
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

  async saveNotifications(
    notifications: NotificationEntity[],
  ): Promise<NotificationEntity[]> {
    return await this.notificationRepository.save(notifications)
  }

  getUsersByNotifications(notifications: NotificationEntity[]): UserEntity[] {
    const userRecords: Record<number, UserEntity> = notifications.reduce(
      (acc, notification) => {
        acc[notification.to.id] = notification.to
        return acc
      },
      {},
    )
    return Object.values(userRecords)
  }
}
