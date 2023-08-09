import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { GameService } from './game.service'
import { AuthGuard } from '../user/guards/auth.guard'
import { GameEntity } from './game.entity'
import { CreateGameDto } from './dto/createGameDto'
import { User } from '../user/decorators/user.decorator'
import { UserEntity } from '../user/user.entity'

@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

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
}
