import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator'
import { UserIdDto } from '../../user/dto/userIdDto'
import { Type } from 'class-transformer'

export class CreateGameDto {
  @IsNotEmpty()
  readonly name: string

  readonly description: string

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserIdDto)
  users: UserIdDto[]
}
