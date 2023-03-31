import instance from 'src/services/instance'
import {
  ILoginRequest,
  IUserDataRequest,
  IUserResponse,
} from 'src/services/user/types'

export const userServices = {
  login: (data: ILoginRequest) => instance.post<IUserResponse>('login/', data),
  auth: (data: IUserDataRequest) => instance.post<IUserResponse>('auth/', data),
  me: () => instance.get<IUserResponse>('me/'),
  update: (data: IUserDataRequest) =>
    instance.patch<IUserResponse>('me/', data),
}
