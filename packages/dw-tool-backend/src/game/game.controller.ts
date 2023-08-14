import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { GameService } from './game.service'
import { AuthGuard } from '../user/guards/auth.guard'
import { GameEntity } from './game.entity'
import { CreateGameDto } from './dto/createGameDto'
import { User } from '../user/decorators/user.decorator'
import { UserEntity } from '../user/user.entity'
import { UpdatePlayerStatusDto } from './dto/updatePlayerStatusDto'
import { PlayerService } from './player/player.service'
import { AddPlayerCharacterDto } from './dto/addPlayerCharacterDto'
import { UpdateGameStatusDto } from './dto/updateGameStatusDto'

@Controller('games')
export class GameController {
  constructor(
    private readonly gameService: GameService,
    private readonly playerService: PlayerService,
  ) {}

  @Get('/')
  @UseGuards(AuthGuard)
  async findAll(@User() currentUser: UserEntity): Promise<GameEntity[]> {
    return this.gameService.findAll(currentUser)
  }

  @Post('/create')
  @UseGuards(AuthGuard)
  async create(
    @Body() createGameDto: CreateGameDto,
    @User() currentUser: UserEntity,
  ): Promise<GameEntity> {
    return this.gameService.create(currentUser, createGameDto)
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id') gameId: number): Promise<GameEntity> {
    return this.gameService.findOne(gameId)
  }

  @Post('/update-game-status')
  @UseGuards(AuthGuard)
  async updateGameStatus(
    @Body() updateGameStatusDto: UpdateGameStatusDto,
    @User() currentUser: UserEntity,
  ) {
    return this.gameService.updateGameStatus(currentUser, updateGameStatusDto)
  }

  // ===== Players =====

  @Post('/update-player-status')
  @UseGuards(AuthGuard)
  async updatePlayerStatus(
    @Body() updatePlayerStatusDto: UpdatePlayerStatusDto,
    @User() currentUser: UserEntity,
  ): Promise<GameEntity> {
    const player = await this.playerService.updatePlayerStatus(
      currentUser,
      updatePlayerStatusDto,
    )

    return await this.gameService.findOne(player.game.id)
  }

  @Post('/add-player-character')
  @UseGuards(AuthGuard)
  async addPlayerCharacter(
    @Body() addPlayerCharacterDto: AddPlayerCharacterDto,
    @User() currentUser: UserEntity,
  ): Promise<GameEntity> {
    const player = await this.playerService.addPlayerCharacter(
      currentUser,
      addPlayerCharacterDto,
    )

    const game = await this.gameService.findOne(player.game.id)
    return await this.gameService.updateGameToReady(game)
  }
}
