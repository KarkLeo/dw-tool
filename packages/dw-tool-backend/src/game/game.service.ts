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
      .createQueryBuilder('games')
      .leftJoinAndSelect('games.players', 'players')
      .leftJoinAndSelect('players.user', 'users')
      .where('players.user.id = :id', { id: currentUser.id })
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

    return await this.gameRepository.save(game)
  }

  async findOne(id: number): Promise<GameEntity> {
    return await this.gameRepository
      .createQueryBuilder('games')
      .leftJoinAndSelect('games.players', 'players')
      .leftJoinAndSelect('players.user', 'users')
      .leftJoinAndSelect('players.character', 'characters')
      .where('games.id = :id', { id })
      .getOne()
  }
}
