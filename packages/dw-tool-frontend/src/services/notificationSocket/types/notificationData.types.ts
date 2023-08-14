// ===== Game Notification Types =====

export enum NotificationGameForPlayerEnum {
  NT_GAME_FOR_PLAYER_INVITE = 'NT_GAME_FOR_PLAYER_INVITE',
  NT_GAME_FOR_PLAYER_GAME_READY = 'NT_GAME_FOR_PLAYER_GAME_READY',
  NT_GAME_FOR_PLAYER_GAME_IN_PROGRESS = 'NT_GAME_FOR_PLAYER_GAME_IN_PROGRESS',
  NT_GAME_FOR_PLAYER_GAME_PAUSED = 'NT_GAME_FOR_PLAYER_GAME_PAUSED',
  NT_GAME_FOR_PLAYER_GAME_FINISHED = 'NT_GAME_FOR_PLAYER_GAME_FINISHED',
  NT_GAME_FOR_PLAYER_KICKED = 'NT_GAME_FOR_PLAYER_KICKED',
}

export enum NotificationGameForOwnerEnum {
  NT_GAME_FOR_OWNER_PLAYER_REJECTED = 'NT_GAME_FOR_OWNER_PLAYER_REJECTED',
  NT_GAME_FOR_OWNER_PLAYER_LEFT = 'NT_GAME_FOR_OWNER_PLAYER_LEFT',
  NT_GAME_FOR_OWNER_PLAYER_ACCEPTED = 'NT_GAME_FOR_OWNER_PLAYER_ACCEPTED',
  NT_GAME_FOR_OWNER_PLAYER_SELECTED_CHARACTER = 'NT_GAME_FOR_OWNER_PLAYER_SELECTED_CHARACTER',
}

export interface INotificationGeneric<T extends object, TYPE extends string> {
  id: number
  type: TYPE
  data: T
  read: boolean
  from: {
    id: number
    name: string
    email: string
  }
  createdAt: Date
}

export type GameNotificationPlayerTypes = INotificationGeneric<
  {
    gameId: number
    gameName: string
  },
  | NotificationGameForPlayerEnum.NT_GAME_FOR_PLAYER_INVITE
  | NotificationGameForPlayerEnum.NT_GAME_FOR_PLAYER_GAME_READY
  | NotificationGameForPlayerEnum.NT_GAME_FOR_PLAYER_GAME_IN_PROGRESS
  | NotificationGameForPlayerEnum.NT_GAME_FOR_PLAYER_GAME_PAUSED
  | NotificationGameForPlayerEnum.NT_GAME_FOR_PLAYER_GAME_FINISHED
  | NotificationGameForPlayerEnum.NT_GAME_FOR_PLAYER_KICKED
>

export type GameNotificationOwnerTypes = INotificationGeneric<
  {
    gameId: number
    gameName: string
    playerId: number
    playerName: string
  },
  | NotificationGameForOwnerEnum.NT_GAME_FOR_OWNER_PLAYER_REJECTED
  | NotificationGameForOwnerEnum.NT_GAME_FOR_OWNER_PLAYER_ACCEPTED
  | NotificationGameForOwnerEnum.NT_GAME_FOR_OWNER_PLAYER_LEFT
>

export type GameNotificationOwnerCharacterTypes = INotificationGeneric<
  {
    gameId: number
    gameName: string
    playerId: number
    playerName: string
    characterId: number
    characterName: string
  },
  NotificationGameForOwnerEnum.NT_GAME_FOR_OWNER_PLAYER_SELECTED_CHARACTER
>

export type NotificationGameTypes =
  | GameNotificationPlayerTypes
  | GameNotificationOwnerTypes
  | GameNotificationOwnerCharacterTypes
