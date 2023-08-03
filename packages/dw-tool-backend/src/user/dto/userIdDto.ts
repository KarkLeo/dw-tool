import { IsInt } from 'class-validator'

export class UserIdDto {
  @IsInt()
  readonly id: number
}
