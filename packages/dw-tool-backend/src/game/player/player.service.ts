import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserService } from '../../user/user.service'
import { PlayerEntity } from './player.entity'
import { UserIdDto } from '../../user/dto/userIdDto'
import { UserEntity } from '../../user/user.entity'
import { PlayerStatusesEnum } from './types/playerStatusesEnum'
import { UpdatePlayerStatusDto } from '../dto/updatePlayerStatusDto'
import { MessageGateway } from '../../message/message.gateway'
import { BuilderGameNotifications } from '../../message/notification/utils/BuilderGameNotifications'
import { AddPlayerCharacterDto } from '../dto/addPlayerCharacterDto'
import { CharacterService } from '../../character/character.service'
import { GameService } from '../game.service'

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(PlayerEntity)
    private readonly playerRepository: Repository<PlayerEntity>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @Inject(forwardRef(() => MessageGateway))
    private readonly messageGateway: MessageGateway,
    @Inject(forwardRef(() => CharacterService))
    private readonly characterService: CharacterService,
    @Inject(forwardRef(() => GameService))
    private readonly gameService: GameService,
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

  async getPlayer(playerId: number): Promise<PlayerEntity> {
    return await this.playerRepository.findOne({
      relations: ['user', 'game', 'character'],
      where: { id: playerId },
    })
  }

  async updatePlayerStatus(
    currentUser: UserEntity,
    updatePlayerStatusDto: UpdatePlayerStatusDto,
  ): Promise<PlayerEntity> {
    const player = await this.getPlayer(updatePlayerStatusDto.playerId)
    const game = await this.gameService.findOne(player.game.id)

    if (updatePlayerStatusDto.status === PlayerStatusesEnum.ACCEPTED) {
      if (player.user.id !== currentUser.id)
        throw new HttpException(
          'Update Player Status: User is not player',
          HttpStatus.METHOD_NOT_ALLOWED,
        )

      if (player.isOwner)
        throw new HttpException(
          'Update Player Status: Player is already owner',
          HttpStatus.METHOD_NOT_ALLOWED,
        )
      if (player.status !== PlayerStatusesEnum.PENDING)
        throw new HttpException(
          'Update Player Status: Player is can not be accepted',
          HttpStatus.METHOD_NOT_ALLOWED,
        )

      player.status = PlayerStatusesEnum.ACCEPTED
      await this.playerRepository.save(player)
      await this.messageGateway.notify(
        BuilderGameNotifications.ownerPlayerAccepted(game, player),
      )
    }

    if (updatePlayerStatusDto.status === PlayerStatusesEnum.REJECTED) {
      if (player.user.id !== currentUser.id)
        throw new HttpException(
          'Update Player Status: User is not player',
          HttpStatus.METHOD_NOT_ALLOWED,
        )
      if (player.isOwner)
        throw new HttpException(
          'Update Player Status: Player is already owner',
          HttpStatus.METHOD_NOT_ALLOWED,
        )
      if (player.status !== PlayerStatusesEnum.PENDING)
        throw new HttpException(
          'Update Player Status: Player is can not be rejected',
          HttpStatus.METHOD_NOT_ALLOWED,
        )

      player.status = PlayerStatusesEnum.REJECTED
      await this.playerRepository.save(player)
      await this.messageGateway.notify(
        BuilderGameNotifications.ownerPlayerRejected(game, player),
      )
    }

    if (updatePlayerStatusDto.status === PlayerStatusesEnum.KICKED) {
      if (
        game.players.find((player) => player.isOwner).user.id !== currentUser.id
      )
        throw new HttpException(
          'Update Player Status: User is not owner',
          HttpStatus.METHOD_NOT_ALLOWED,
        )
      if (player.isOwner)
        throw new HttpException(
          'Update Player Status: Player is owner',
          HttpStatus.METHOD_NOT_ALLOWED,
        )

      player.status = PlayerStatusesEnum.KICKED
      await this.playerRepository.save(player)
      await this.messageGateway.notify(
        BuilderGameNotifications.playerKicked(game, player),
      )
    }

    if (updatePlayerStatusDto.status === PlayerStatusesEnum.LEFT) {
      if (player.user.id !== currentUser.id)
        throw new HttpException(
          'Update Player Status: User is not player',
          HttpStatus.METHOD_NOT_ALLOWED,
        )
      if (player.isOwner)
        throw new HttpException(
          'Update Player Status: Player can not leave the game',
          HttpStatus.METHOD_NOT_ALLOWED,
        )
      if (player.status !== PlayerStatusesEnum.ACCEPTED)
        throw new HttpException(
          'Update Player Status: Player is can not be left',
          HttpStatus.METHOD_NOT_ALLOWED,
        )

      player.status = PlayerStatusesEnum.LEFT
      await this.playerRepository.save(player)
      await this.messageGateway.notify(
        BuilderGameNotifications.ownerPlayerLeft(game, player),
      )
    }

    return player
  }

  async addPlayerCharacter(
    currentUser: UserEntity,
    addPlayerCharacterDto: AddPlayerCharacterDto,
  ): Promise<PlayerEntity> {
    const player = await this.getPlayer(addPlayerCharacterDto.playerId)
    const game = await this.gameService.findOne(player.game.id)

    if (player.user.id !== currentUser.id)
      throw new HttpException(
        'Add Character: User is not player',
        HttpStatus.METHOD_NOT_ALLOWED,
      )
    if (player.isOwner)
      throw new HttpException(
        'Add Character: Player is owner',
        HttpStatus.METHOD_NOT_ALLOWED,
      )
    if (player.status !== PlayerStatusesEnum.ACCEPTED)
      throw new HttpException(
        'Add Character: Player is can not be left',
        HttpStatus.METHOD_NOT_ALLOWED,
      )
    if (player.character)
      throw new HttpException(
        'Add Character: Player already has a character',
        HttpStatus.METHOD_NOT_ALLOWED,
      )

    const character = await this.characterService.findOneById(
      addPlayerCharacterDto.characterId,
    )

    if (character.user.id !== currentUser.id)
      throw new HttpException(
        'Add Character: Character is not user',
        HttpStatus.METHOD_NOT_ALLOWED,
      )

    player.character = character
    await this.playerRepository.save(player)
    await this.messageGateway.notify(
      BuilderGameNotifications.ownerPlayerSelectedCharacter(game, player),
    )

    return player
  }
}
