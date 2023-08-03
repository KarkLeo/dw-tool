import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { UserEntity } from '../../user/user.entity'
import { CharacterEntity } from '../../character/character.entity'
import { PlayerStatusesEnum } from './types/playerStatusesEnum'
import { GameEntity } from '../game.entity'

@Entity({ name: 'players' })
export class PlayerEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'enum',
    enum: PlayerStatusesEnum,
    default: PlayerStatusesEnum.PENDING,
  })
  status: PlayerStatusesEnum

  @Column({ default: false })
  isOwner: boolean

  @Column({ default: false })
  isGM: boolean

  @ManyToOne(() => UserEntity, (user) => user.players)
  user: UserEntity

  @ManyToOne(() => CharacterEntity, (character) => character.players)
  character: CharacterEntity

  @ManyToOne(() => GameEntity, (game) => game.players)
  game: GameEntity
}
