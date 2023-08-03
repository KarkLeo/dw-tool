import { IUserData } from 'dw-tool-meta'

export interface IUserResponse {
  user: IUserData & {
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
