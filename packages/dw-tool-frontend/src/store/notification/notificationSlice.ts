import { INotificationResponse } from '../../services/notificationSocket/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NotificationGameTypes } from '../../services/notificationSocket/types/notificationData.types'

export interface NotificationState {
  notifications: NotificationGameTypes[]
}

const initialState: NotificationState = {
  notifications: [],
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotifications: (
      state,
      { payload }: PayloadAction<NotificationGameTypes[]>
    ) => {
      state.notifications = payload
    },
  },
})

export const { setNotifications } = notificationSlice.actions

export default notificationSlice.reducer
