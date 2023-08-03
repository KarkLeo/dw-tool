import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { UserEntity } from '../../user/user.entity'

@Entity({ name: 'connections' })
export class ConnectionEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  connectionId: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @ManyToOne(() => UserEntity, (user) => user.connections)
  user: UserEntity
}
