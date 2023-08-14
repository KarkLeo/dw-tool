import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { UserService } from '../../user/user.service'
import { InjectRepository } from '@nestjs/typeorm'
import { ConnectionEntity } from './connection.entity'
import { In, Repository } from 'typeorm'
import { UserEntity } from '../../user/user.entity'

@Injectable()
export class ConnectionService {
  constructor(
    @InjectRepository(ConnectionEntity)
    private readonly connectionRepository: Repository<ConnectionEntity>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async createConnection(
    token: string,
    connectionId: string,
  ): Promise<ConnectionEntity> {
    const user = await this.userService.findByToken(token)
    if (!user) throw new Error('User not found')

    const connection = new ConnectionEntity()
    connection.connectionId = connectionId
    connection.user = user

    return await this.connectionRepository.save(connection)
  }

  async findConnection(connectionId: string): Promise<ConnectionEntity> {
    return await this.connectionRepository.findOne({ where: { connectionId } })
  }

  async findConnectionsByUser(userId: number): Promise<ConnectionEntity[]> {
    return await this.connectionRepository.find({
      relations: ['user'],
      where: { user: { id: userId } },
    })
  }

  async findConnectionsByUsers(
    users: UserEntity[],
  ): Promise<ConnectionEntity[]> {
    return await this.connectionRepository.find({
      relations: ['user'],
      where: { user: { id: In(users.map((user) => user.id)) } },
    })
  }

  async deleteConnection(connectionId: string): Promise<ConnectionEntity> {
    const connection = await this.findConnection(connectionId)
    await this.connectionRepository.delete({ connectionId })

    return connection
  }
}
