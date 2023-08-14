import instance from '../instance'
import {
  ICreateGameRequest,
  IGameAddPlayerCharacterRequest,
  IGameChangePlayerStatusRequest,
  IGameUpdateStatusRequest,
} from './types'

export const gamesServices = {
  create: (data: ICreateGameRequest) => instance.post('games/create', data),
  findAll: () => instance.get('games/'),
  findOne: (id: number | string) => instance.get(`games/${id}`),
  updatePlayerStatus: (data: IGameChangePlayerStatusRequest) =>
    instance.post('games/update-player-status', data),
  addPlayerCharacter: (data: IGameAddPlayerCharacterRequest) =>
    instance.post('games/add-player-character', data),
  updateGameStatus: (data: IGameUpdateStatusRequest) =>
    instance.post('games/update-game-status', data),
}
