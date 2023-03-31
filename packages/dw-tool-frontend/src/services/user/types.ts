import { IUser } from 'src/store/user/types'

export interface IUserResponse {
  user: IUser & {
    token: string
  }
}

export interface IUserDataRequest {
  email: string
  password: string
  name: string
}

export interface ILoginRequest {
  email: string
  password: string
}
