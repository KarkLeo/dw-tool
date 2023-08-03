import { RootState } from '../root'
import { createSelector } from '@reduxjs/toolkit'

export const listOfCharactersSelector = (state: RootState) =>
  state.listOfCharacters

export const listOfCharactersListSelector = createSelector(
  listOfCharactersSelector,
  (listOfCharacters) => listOfCharacters.list
)
