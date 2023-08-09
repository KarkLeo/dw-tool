import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserService } from '../../user/user.service'
import { PlayerEntity } from './player.entity'
import { UserIdDto } from '../../user/dto/userIdDto'
import { UserEntity } from '../../user/user.entity'
import { PlayerStatusesEnum } from './types/playerStatusesEnum'
import { GameEntity } from '../game.entity'

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(PlayerEntity)
    private readonly playerRepository: Repository<PlayerEntity>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async createPlayers(
    currentUser: UserEntity,
    usersId: UserIdDto[],
  ): Promise<PlayerEntity[]> {
    const users = await this.userService.findByIds(usersId)
    const players = [
      ...users.filter((user) => user.id !== currentUser.id),
      currentUser,
    ].map((user) => {
      const player = new PlayerEntity()
      player.user = user
      player.status =
        user.id === currentUser.id
          ? PlayerStatusesEnum.ACCEPTED
          : PlayerStatusesEnum.PENDING
      player.isOwner = user.id === currentUser.id
      player.isGM = user.id === currentUser.id

      return player
    })

    return await this.playerRepository.save(players)
  }
}
