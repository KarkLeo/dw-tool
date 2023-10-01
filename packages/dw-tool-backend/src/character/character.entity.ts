import { UserEntity } from '../user/user.entity'
import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { ALIGNMENTS, CLASSES, RACES } from 'dw-tool-meta'
import { PlayerEntity } from '../game/player/player.entity'

@Entity({ name: 'characters' })
export class CharacterEntity {
  @PrimaryGeneratedColumn()
  id: number

  @PrimaryColumn()
  name: string

  @Column('simple-array')
  looks: string[]

  @Column({
    type: 'enum',
    enum: CLASSES,
  })
  class: CLASSES

  @Column({ type: 'enum', enum: RACES })
  race: RACES

  @Column({ type: 'enum', enum: ALIGNMENTS })
  alignment: ALIGNMENTS

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date

  @Column({ default: 0 })
  strength: number

  @Column({ default: 0 })
  dexterity: number

  @Column({ default: 0 })
  constitution: number

  @Column({ default: 0 })
  intelligence: number

  @Column({ default: 0 })
  wisdom: number

  @Column({ default: 0 })
  charisma: number

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date()
  }

  @ManyToOne(() => UserEntity, (user) => user.characters)
  user: UserEntity

  @OneToMany(() => PlayerEntity, (player) => player.character)
  players: PlayerEntity[]
}
