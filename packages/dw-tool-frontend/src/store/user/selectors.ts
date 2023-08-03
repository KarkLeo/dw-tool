import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../root'

export const userSelector = (state: RootState) => state.user

export const userDataSelector = createSelector(
  userSelector,
  (user) => user.user
)

export const isLoadingUserSelector = createSelector(
  userSelector,
  (user) => user.loading
)

export const isLoadedUserSelector = createSelector(
  userSelector,
  (user) => user.loaded
)
