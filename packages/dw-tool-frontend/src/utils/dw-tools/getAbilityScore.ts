import {
  ABILITIES,
  ABILITIES_FROM_MODIFIERS,
  ABILITIES_MODIFIERS,
} from 'src/meta/constants'
import { Abilities } from 'src/meta/models'
import { calcAbilityModifier } from 'src/utils/dw-tools/calcAbilityModifier'

export const getAbilityScore = (
  ability: ABILITIES | ABILITIES_MODIFIERS,
  abilities: Abilities
): number =>
  Object.keys(ABILITIES_MODIFIERS).includes(ability as string)
    ? calcAbilityModifier(
        abilities[ABILITIES_FROM_MODIFIERS[ability as ABILITIES_MODIFIERS]]
      )
    : abilities[ability as ABILITIES]
