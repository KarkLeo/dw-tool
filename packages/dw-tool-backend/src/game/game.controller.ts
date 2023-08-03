import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { GameService } from './game.service'
import { AuthGuard } from '../user/guards/auth.guard'
import { GameEntity } from './game.entity'
import { CreateGameDto } from './dto/createGameDto'
import { User } from '../user/decorators/user.decorator'
import { UserEntity } from '../user/user.entity'

@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post('/create')
  @UseGuards(AuthGuard)
  async create(
    @Body() createGameDto: CreateGameDto,
    @User() currentUser: UserEntity,
  ): Promise<GameEntity> {
    return this.gameService.create(currentUser, createGameDto)
  }
}
