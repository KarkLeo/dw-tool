import { IsNotEmpty } from 'class-validator'
import { PlayerStatusesEnum } from '../player/types/playerStatusesEnum'

export class UpdatePlayerStatusDto {
  @IsNotEmpty()
  readonly playerId: number

  @IsNotEmpty()
  readonly status: PlayerStatusesEnum
}
