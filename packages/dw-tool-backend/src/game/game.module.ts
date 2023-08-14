import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GameEntity } from './game.entity'
import { UserModule } from '../user/user.module'
import { GameService } from './game.service'
import { PlayerEntity } from './player/player.entity'
import { PlayerService } from './player/player.service'
import { GameController } from './game.controller'
import { MessageModule } from '../message/message.module'
import { CharacterModule } from '../character/character.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([GameEntity, PlayerEntity]),
    forwardRef(() => UserModule),
    forwardRef(() => MessageModule),
    forwardRef(() => CharacterModule),
  ],
  controllers: [GameController],
  providers: [GameService, PlayerService],
})
export class GameModule {}
