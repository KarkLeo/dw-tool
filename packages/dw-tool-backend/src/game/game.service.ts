import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common'
import { GameEntity } from './game.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from '../user/user.entity'
import { CreateGameDto } from './dto/createGameDto'
import { GameStatusesEnum } from './types/gameStatuses.enum'
import { UserService } from '../user/user.service'
import { PlayerService } from './player/player.service'
import { MessageGateway } from '../message/message.gateway'
import { BuilderGameNotifications } from '../message/notification/utils/BuilderGameNotifications'
import { PlayerStatusesEnum } from './player/types/playerStatusesEnum'
import { UpdateGameStatusDto } from './dto/updateGameStatusDto'

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameEntity)
    private readonly gameRepository: Repository<GameEntity>,

    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    @Inject(forwardRef(() => PlayerService))
    private readonly playerService: PlayerService,

    @Inject(forwardRef(() => MessageGateway))
    private readonly messageGateway: MessageGateway,
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
    await this.gameRepository.save(game)

    this.messageGateway.notify(BuilderGameNotifications.playerInvite(game))

    return game
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

  checkGameIsReady(game: GameEntity): boolean {
    return (
      game.players.every(
        (player) =>
          (player.status === PlayerStatusesEnum.ACCEPTED &&
            (player.isOwner || player.character)) ||
          player.status === PlayerStatusesEnum.REJECTED ||
          player.status === PlayerStatusesEnum.KICKED ||
          player.status === PlayerStatusesEnum.LEFT,
      ) &&
      game.players.some(
        (player) =>
          player.character &&
          player.status === PlayerStatusesEnum.ACCEPTED &&
          !player.isOwner,
      )
    )
  }

  async updateGameToReady(game: GameEntity): Promise<GameEntity> {
    if (this.checkGameIsReady(game)) {
      game.status = GameStatusesEnum.READY
      await this.gameRepository.save(game)
      this.messageGateway.notify(BuilderGameNotifications.playerGameReady(game))
      return game
    }
    return game
  }

  async updateGameStatus(
    currentUser: UserEntity,
    updateGameStatusDto: UpdateGameStatusDto,
  ): Promise<GameEntity> {
    if (
      updateGameStatusDto.status === GameStatusesEnum.READY ||
      updateGameStatusDto.status === GameStatusesEnum.PENDING
    )
      throw new HttpException(
        'Update Game Status: Status is not allowed',
        HttpStatus.METHOD_NOT_ALLOWED,
      )

    const game = await this.findOne(updateGameStatusDto.gameId)

    if (!game)
      throw new HttpException(
        'Update Game Status: Game not found',
        HttpStatus.NOT_FOUND,
      )
    if (
      game.players.find((player) => player.isOwner)?.user?.id !== currentUser.id
    )
      throw new HttpException(
        'Update Game Status: User is not owner',
        HttpStatus.METHOD_NOT_ALLOWED,
      )

    // to READY
    if (updateGameStatusDto.status === GameStatusesEnum.PAUSED) {
      if (game.status !== GameStatusesEnum.IN_PROGRESS) {
        throw new HttpException(
          'Update Game Status: Game is not in progress',
          HttpStatus.METHOD_NOT_ALLOWED,
        )
      }
      game.status = GameStatusesEnum.PAUSED
      await this.gameRepository.save(game)
      this.messageGateway.notify(
        BuilderGameNotifications.playerGamePaused(game),
      )
    }

    // to IN_PROGRESS
    if (updateGameStatusDto.status === GameStatusesEnum.IN_PROGRESS) {
      if (
        game.status !== GameStatusesEnum.PAUSED &&
        game.status !== GameStatusesEnum.READY
      )
        throw new HttpException(
          'Update Game Status: Game is not ready or paused',
          HttpStatus.METHOD_NOT_ALLOWED,
        )
      game.status = GameStatusesEnum.IN_PROGRESS
      await this.gameRepository.save(game)
      this.messageGateway.notify(
        BuilderGameNotifications.playerGameInProgress(game),
      )
    }

    // to FINISHED
    if (updateGameStatusDto.status === GameStatusesEnum.FINISHED) {
      if (
        game.status !== GameStatusesEnum.READY &&
        game.status !== GameStatusesEnum.PAUSED &&
        game.status !== GameStatusesEnum.IN_PROGRESS
      )
        throw new HttpException(
          'Update Game Status: Game can not finished',
          HttpStatus.METHOD_NOT_ALLOWED,
        )

      game.status = GameStatusesEnum.FINISHED
      await this.gameRepository.save(game)
      this.messageGateway.notify(
        BuilderGameNotifications.playerGameFinished(game),
      )
    }

    return game
  }
}
