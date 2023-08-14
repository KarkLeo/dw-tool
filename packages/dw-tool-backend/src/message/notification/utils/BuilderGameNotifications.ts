import {
  NotificationGameForOwnerEnum,
  NotificationGameForPlayerEnum,
} from '../types/notificationData.types'
import { GameEntity } from '../../../game/game.entity'
import { NotificationEntity } from '../notification.entity'
import { PlayerEntity } from '../../../game/player/player.entity'

export const BuilderGameNotifications = {
  playerInvite(game: GameEntity): NotificationEntity[] {
    const owner = game.players.find((player) => player.isOwner)
    if (!owner)
      throw new Error(
        'Build Game Notification [Player - Invite]: Owner not found',
      )

    return game.players
      .filter((player) => !player.isOwner)
      .map((player) => {
        const notification = new NotificationEntity()
        notification.type =
          NotificationGameForPlayerEnum.NT_GAME_FOR_PLAYER_INVITE
        notification.data = {
          gameId: game.id,
          gameName: game.name,
        }
        notification.to = player.user
        notification.from = owner.user
        return notification
      })
  },
  playerGameReady(game: GameEntity): NotificationEntity[] {
    const owner = game.players.find((player) => player.isOwner)
    if (!owner)
      throw new Error(
        'Build Game Notification [Player - Game Ready]: Owner not found',
      )

    return game.players.map((player) => {
      const notification = new NotificationEntity()
      notification.type =
        NotificationGameForPlayerEnum.NT_GAME_FOR_PLAYER_GAME_READY
      notification.data = {
        gameId: game.id,
        gameName: game.name,
      }
      notification.to = player.user
      notification.from = owner.user
      return notification
    })
  },

  playerGameInProgress(game: GameEntity): NotificationEntity[] {
    const owner = game.players.find((player) => player.isOwner)
    if (!owner)
      throw new Error(
        'Build Game Notification [Player - In Progress]: Owner not found',
      )

    return game.players
      .filter((player) => !player.isOwner)
      .map((player) => {
        const notification = new NotificationEntity()
        notification.type =
          NotificationGameForPlayerEnum.NT_GAME_FOR_PLAYER_GAME_IN_PROGRESS
        notification.data = {
          gameId: game.id,
          gameName: game.name,
        }
        notification.to = player.user
        notification.from = owner.user
        return notification
      })
  },

  playerGamePaused(game: GameEntity): NotificationEntity[] {
    const owner = game.players.find((player) => player.isOwner)
    if (!owner)
      throw new Error(
        'Build Game Notification [Player - Paused]: Owner not found',
      )

    return game.players
      .filter((player) => !player.isOwner)
      .map((player) => {
        const notification = new NotificationEntity()
        notification.type =
          NotificationGameForPlayerEnum.NT_GAME_FOR_PLAYER_GAME_PAUSED
        notification.data = {
          gameId: game.id,
          gameName: game.name,
        }
        notification.to = player.user
        notification.from = owner.user
        return notification
      })
  },

  playerGameFinished(game: GameEntity): NotificationEntity[] {
    const owner = game.players.find((player) => player.isOwner)
    if (!owner)
      throw new Error(
        'Build Game Notification [Player - Finished]: Owner not found',
      )

    return game.players
      .filter((player) => !player.isOwner)
      .map((player) => {
        const notification = new NotificationEntity()
        notification.type =
          NotificationGameForPlayerEnum.NT_GAME_FOR_PLAYER_GAME_FINISHED
        notification.data = {
          gameId: game.id,
          gameName: game.name,
        }
        notification.to = player.user
        notification.from = owner.user
        return notification
      })
  },

  playerKicked(game: GameEntity, player: PlayerEntity): NotificationEntity[] {
    const owner = game.players.find((player) => player.isOwner)
    if (!owner)
      throw new Error(
        'Build Game Notification [Player - Kicked]: Owner not found',
      )

    const notification = new NotificationEntity()
    notification.type = NotificationGameForPlayerEnum.NT_GAME_FOR_PLAYER_KICKED
    notification.data = {
      gameId: game.id,
      gameName: game.name,
    }
    notification.to = player.user
    notification.from = owner.user
    return [notification]
  },

  ownerPlayerRejected(
    game: GameEntity,
    player: PlayerEntity,
  ): NotificationEntity[] {
    const owner = game.players.find((player) => player.isOwner)
    if (!owner)
      throw new Error(
        'Build Game Notification [Owner - Player Rejected]: Owner not found',
      )
    if (!player.user)
      throw new Error(
        'Build Game Notification [Owner - Player Rejected]: Player not found',
      )

    const notification = new NotificationEntity()
    notification.type =
      NotificationGameForOwnerEnum.NT_GAME_FOR_OWNER_PLAYER_REJECTED
    notification.data = {
      gameId: game.id,
      gameName: game.name,
      playerId: player.user.id,
      playerName: player.user.name,
    }
    notification.to = owner.user
    notification.from = player.user
    return [notification]
  },

  ownerPlayerAccepted(
    game: GameEntity,
    player: PlayerEntity,
  ): NotificationEntity[] {
    const owner = game.players.find((player) => player.isOwner)
    if (!owner)
      throw new Error(
        'Build Game Notification [Owner - Player Accepted]: Owner not found',
      )
    if (!player.user)
      throw new Error(
        'Build Game Notification [Owner - Player Accepted]: Player not found',
      )

    const notification = new NotificationEntity()
    notification.type =
      NotificationGameForOwnerEnum.NT_GAME_FOR_OWNER_PLAYER_ACCEPTED
    notification.data = {
      gameId: game.id,
      gameName: game.name,
      playerId: player.user.id,
      playerName: player.user.name,
    }
    notification.to = owner.user
    notification.from = player.user
    return [notification]
  },

  ownerPlayerLeft(
    game: GameEntity,
    player: PlayerEntity,
  ): NotificationEntity[] {
    const owner = game.players.find((player) => player.isOwner)
    if (!owner)
      throw new Error(
        'Build Game Notification [Owner - Player Left]: Owner not found',
      )
    if (!player.user)
      throw new Error(
        'Build Game Notification [Owner - Player Left]: Player not found',
      )

    const notification = new NotificationEntity()
    notification.type =
      NotificationGameForOwnerEnum.NT_GAME_FOR_OWNER_PLAYER_LEFT
    notification.data = {
      gameId: game.id,
      gameName: game.name,
      playerId: player.user.id,
      playerName: player.user.name,
    }
    notification.to = owner.user
    notification.from = player.user
    return [notification]
  },

  ownerPlayerSelectedCharacter(
    game: GameEntity,
    player: PlayerEntity,
  ): NotificationEntity[] {
    const owner = game.players.find((player) => player.isOwner)
    if (!owner)
      throw new Error(
        'Build Game Notification [Owner - Player Selected Character]: Owner not found',
      )
    if (!player.user)
      throw new Error(
        'Build Game Notification [Owner - Player Selected Character]: Player not found',
      )
    if (!player.character)
      throw new Error(
        'Build Game Notification [Owner - Player Selected Character]: Character not found',
      )

    const notification = new NotificationEntity()
    notification.type =
      NotificationGameForOwnerEnum.NT_GAME_FOR_OWNER_PLAYER_SELECTED_CHARACTER
    notification.data = {
      gameId: game.id,
      gameName: game.name,
      playerId: player.user.id,
      playerName: player.user.name,
      characterId: player.character.id,
      characterName: player.character.name,
    }
    notification.to = owner.user
    notification.from = player.user
    return [notification]
  },
}
