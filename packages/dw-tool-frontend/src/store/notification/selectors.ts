import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../root'

export const notificationsSelector = (state: RootState) => state.notification

export const notificationsDataSelector = createSelector(
  notificationsSelector,
  (notifications) => notifications.notifications
)
