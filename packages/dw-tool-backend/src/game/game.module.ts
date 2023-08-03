import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GameEntity } from './game.entity'
import { UserModule } from '../user/user.module'
import { GameService } from './game.service'
import { PlayerEntity } from './player/player.entity'
import { PlayerService } from './player/player.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([GameEntity, PlayerEntity]),
    forwardRef(() => UserModule),
  ],
  providers: [GameService, PlayerService],
})
export class GameModule {}