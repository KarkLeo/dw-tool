import { store } from 'src/store/root'
import { resetUser } from 'src/store/user/userSlice'
import { getToken, removeToken } from 'src/utils/auth'
import { ResponseStatus } from '../types'

export const AddTokenInterceptor = (config: any) => {
  const token = getToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}

export const RemoveTokenInterceptor = (config: any) => (error: any) => {
  if (error.response.status === ResponseStatus.UNAUTHORIZED) {
    removeToken()
    store.dispatch(resetUser())
  }

  return Promise.reject(error)
}
