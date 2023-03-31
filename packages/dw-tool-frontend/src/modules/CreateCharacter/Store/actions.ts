import { ABILITIES, ALIGNMENTS, CLASSES, RACES } from 'src/meta/constants'

export const setCharacterNameAction = (name: string) =>
  ({
    type: 'SET_CHARACTER_NAME' as const,
    payload: name,
  } as const)

export const setCharacterLooksAction = (index: number, value: string) => ({
  type: 'SET_CHARACTER_LOOKS' as const,
  payload: { index, value },
})
export const setCharacterClassAction = (characterClass: CLASSES) =>
  ({
    type: 'SET_CHARACTER_CLASS' as const,
    payload: characterClass,
  } as const)

export const setCharacterRaceAction = (race: RACES) =>
  ({
    type: 'SET_CHARACTER_RACE' as const,
    payload: race,
  } as const)

export const setCharacterAlignmentAction = (alignment: ALIGNMENTS) =>
  ({
    type: 'SET_CHARACTER_ALIGNMENT' as const,
    payload: alignment,
  } as const)

export const setCharacterAbilityAction = (ability: ABILITIES, value: number) =>
  ({
    type: 'SET_CHARACTER_ABILITY' as const,
    payload: { ability, value },
  } as const)
