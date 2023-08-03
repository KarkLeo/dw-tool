import { RootState } from '../root'
import { createSelector } from '@reduxjs/toolkit'

export const redirectSelector = (state: RootState) => state.redirect

export const redirectPathSelector = createSelector(
  redirectSelector,
  (redirect) => redirect.path
)
