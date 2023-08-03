import { RootState } from '../root'
import { createSelector } from '@reduxjs/toolkit'
import { CLASSES_CONFIG_RECORD, validateCreateCharacter } from 'dw-tool-meta'

export const newCharacterSelector = (state: RootState) => state.newCharacter

export const newCharacterClassSelector = createSelector(
  newCharacterSelector,
  (newCharacter) => newCharacter.class
)

export const newCharacterClassConfigSelector = createSelector(
  newCharacterClassSelector,
  (characterClass) =>
    characterClass ? CLASSES_CONFIG_RECORD[characterClass] : null
)

export const newCharacterIsValidSelector = createSelector(
  newCharacterSelector,
  (character) => validateCreateCharacter(character)
)
