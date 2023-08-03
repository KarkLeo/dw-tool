import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { UserEntity } from '../../user/user.entity'

@Entity({ name: 'notifications' })
export class NotificationEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  type: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column('json')
  data: any

  @Column({ default: false })
  read: boolean

  @ManyToOne(() => UserEntity, (user) => user.notificationsTo)
  to: UserEntity

  @ManyToOne(() => UserEntity, (user) => user.notificationsFrom, {
    nullable: true,
  })
  from: UserEntity
}
