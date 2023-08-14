import { IsNotEmpty } from 'class-validator'

export class AddPlayerCharacterDto {
  @IsNotEmpty()
  readonly playerId: number

  @IsNotEmpty()
  readonly characterId: number
}
