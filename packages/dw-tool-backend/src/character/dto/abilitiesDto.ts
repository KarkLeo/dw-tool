import { IsInt, IsNotEmpty, Max, Min } from 'class-validator'

export class AbilitiesDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(18)
  readonly strength: number

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(18)
  readonly dexterity: number

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(18)
  readonly constitution: number

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(18)
  readonly intelligence: number

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(18)
  readonly wisdom: number

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(18)
  readonly charisma: number
}
