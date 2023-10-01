import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { hash } from 'bcrypt'
import { CharacterEntity } from '../character/character.entity'
import { ConnectionEntity } from '../message/connection/connection.entity'
import { NotificationEntity } from '../message/notification/notification.entity'
import { GameEntity } from '../game/game.entity'
import { PlayerEntity } from '../game/player/player.entity'

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  email: string

  @Column()
  name: string

  @Column({ select: false })
  password: string

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10)
  }

  @OneToMany(() => CharacterEntity, (character) => character.user)
  characters: CharacterEntity[]

  @OneToMany(() => ConnectionEntity, (connection) => connection.user)
  connections: ConnectionEntity[]

  @OneToMany(() => NotificationEntity, (notification) => notification.to)
  notificationsTo: NotificationEntity[]

  @OneToMany(() => NotificationEntity, (notification) => notification.from)
  notificationsFrom: NotificationEntity[]

  @OneToMany(() => PlayerEntity, (player) => player.user)
  players: GameEntity[]
}
