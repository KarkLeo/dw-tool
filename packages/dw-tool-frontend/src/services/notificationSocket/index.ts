import manager from './socket'
import { getToken } from '../../utils/auth'

export const initNotificationSocket = () => {
  console.log('initNotificationSocket')
  return manager.socket('/message', {
    auth: {
      token: getToken(),
    },
  })
}
