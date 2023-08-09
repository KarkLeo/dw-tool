import instance from '../instance'
import { ICreateGameRequest } from './types'

export const gamesServices = {
  create: (data: ICreateGameRequest) => instance.post('games/create', data),
  findAll: () => instance.get('games/'),
  findOne: (id: number | string) => instance.get(`games/${id}`),
}
