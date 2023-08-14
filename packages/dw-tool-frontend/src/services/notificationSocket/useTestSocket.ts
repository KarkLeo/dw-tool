import { useEffect } from 'react'
import { initNotificationSocket } from './index'
import { useAppDispatch } from '../../store/root'
import { setNotifications } from '../../store/notification/notificationSlice'

export const useTestSocket = () => {
  console.log('useTestSocket')
  const dispatch = useAppDispatch()

  useEffect(() => {
    const socket = initNotificationSocket()
    socket.connect()
    socket.on('message', (data) => {
      if (data.notifications) dispatch(setNotifications(data.notifications))
    })
  }, [])
}
