import { RootState } from '../root'
import { createSelector } from '@reduxjs/toolkit'
import { userDataSelector } from '../user/selectors'

export const currentCharacterSelector = (state: RootState) =>
  state.currentCharacter

export const currentCharacterDataSelector = createSelector(
  currentCharacterSelector,
  (currentCharacter) => currentCharacter.data
)

export const isOwnCurrentCharacterSelector = createSelector(
  currentCharacterDataSelector,
  userDataSelector,
  (currentCharacterData, userData) =>
    currentCharacterData?.user?.id === userData?.id
)
