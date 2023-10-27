import { IsEnum, IsInstance, IsNotEmpty, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { ALIGNMENTS, CLASSES, RACES } from 'dw-tool-meta'
import { AbilitiesDto } from './abilitiesDto'

export class CreateCharacterDto {
  @IsNotEmpty()
  readonly name: string

  readonly looks: Record<number, string>

  @IsNotEmpty()
  @IsEnum(RACES)
  readonly race: RACES

  @IsNotEmpty()
  @IsEnum(CLASSES)
  readonly class: CLASSES

  @IsNotEmpty()
  @IsEnum(ALIGNMENTS)
  readonly alignment: ALIGNMENTS

  @IsNotEmpty()
  @IsInstance(AbilitiesDto)
  @ValidateNested()
  @Type(() => AbilitiesDto)
  readonly abilities: AbilitiesDto
}
