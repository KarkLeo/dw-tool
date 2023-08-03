import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { GameEntity } from './game.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from '../user/user.entity'
import { CreateGameDto } from './dto/createGameDto'
import { GameStatusesEnum } from './types/gameStatuses.enum'
import { UserService } from '../user/user.service'
import { PlayerService } from './player/player.service'

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameEntity)
    private readonly gameRepository: Repository<GameEntity>,

    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    @Inject(forwardRef(() => PlayerService))
    private readonly playerService: PlayerService,
  ) {}

  async findAll(currentUser: UserEntity): Promise<GameEntity[]> {
    return await this.gameRepository
      .createQueryBuilder('game')
      .leftJoinAndSelect('game.users', 'users')
      .leftJoinAndSelect('game.characters', 'characters')
      .where('users.id = :id', { id: currentUser.id })
      .orWhere('owner.id = :id', { id: currentUser.id })
      .getMany()
  }

  async create(
    currentUser: UserEntity,
    createGameDto: CreateGameDto,
  ): Promise<GameEntity> {
    const game = new GameEntity()
    const players = await this.playerService.createPlayers(
      currentUser,
      createGameDto.users,
    )
    game.status = GameStatusesEnum.PENDING
    game.name = createGameDto.name
    game.description = createGameDto.description
    game.players = players

    const savedGame = await this.gameRepository.save(game)
    await this.playerService.attachPlayersToGame(players, savedGame)
    return game
  }
}
