// ===== Game Notification Types =====
export enum GameNotificationTypeEnum {
  NT_GAME_INVITE = 'NT_GAME_INVITE',
  NT_GAME_INVITE_ACCEPTED = 'NT_GAME_INVITE_ACCEPTED',
  NT_GAME_INVITE_DECLINED = 'NT_GAME_INVITE_DECLINED',
  NT_GAME_INVITE_CANCELLED = 'NT_GAME_INVITE_CANCELLED',
  NT_GAME_READY = 'NT_GAME_READY',
  NT_GAME_STARTED = 'NT_GAME_STARTED',
  NT_GAME_ENDED = 'NT_GAME_ENDED',
  NT_GAME_CANCELLED = 'NT_GAME_CANCELLED',
  NT_GAME_FINISHED = 'NT_GAME_FINISHED',
}

// ===== Game Notification Data =====
export interface GameNotificationDataInterface {
  type: GameNotificationTypeEnum
  data: {
    gameId: number
  }
}

// ===== Notification Data =====
export type NotificationDataType = GameNotificationDataInterface
