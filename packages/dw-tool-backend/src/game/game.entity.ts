import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { GameStatusesEnum } from './types/gameStatuses.enum'
import { PlayerEntity } from './player/player.entity'

@Entity({ name: 'games' })
export class GameEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'enum',
    enum: GameStatusesEnum,
    default: GameStatusesEnum.PENDING,
  })
  status: GameStatusesEnum

  @Column()
  name: string

  @Column()
  description: string

  @OneToMany(() => PlayerEntity, (player) => player.game)
  players: PlayerEntity[]
}
