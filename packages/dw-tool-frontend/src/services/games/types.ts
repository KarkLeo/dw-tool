export interface ICreateGameRequest {
  name: string
  description: string
  users: {
    id: number
  }[]
}

export interface IGameChangePlayerStatusRequest {
  playerId: number
  status: PlayerStatusesEnum
}

export interface IGameAddPlayerCharacterRequest {
  playerId: number
  characterId: number
}

export interface IGameUpdateStatusRequest {
  gameId: number
  status: GameStatusesEnum
}

export enum GameStatusesEnum {
  PENDING = 'PENDING',
  READY = 'READY',
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
  PAUSED = 'PAUSED',
}

export enum PlayerStatusesEnum {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  KICKED = 'KICKED',
  LEFT = 'LEFT',
}
