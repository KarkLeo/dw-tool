import { IsNotEmpty } from 'class-validator'
import { GameStatusesEnum } from '../types/gameStatuses.enum'

export class UpdateGameStatusDto {
  @IsNotEmpty()
  readonly gameId: number

  @IsNotEmpty()
  readonly status: GameStatusesEnum
}
