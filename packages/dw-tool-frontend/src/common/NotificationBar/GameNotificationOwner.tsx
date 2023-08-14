import React from 'react'
import {
  GameNotificationOwnerTypes,
  NotificationGameForOwnerEnum,
} from '../../services/notificationSocket/types/notificationData.types'
import { Link } from 'react-router-dom'
import { PATHS } from '../../routes/config'

export const GameNotificationOwner: React.FC<GameNotificationOwnerTypes> = ({
  type,
  read,
  data,
  createdAt,
}) => (
  <div
    className={`flex justify-between items-center p-2 ${
      !read ? 'bg-gray-100' : 'bg-white'
    }`}
  >
    <div>
      <div className='font-bold flex items-center'>
        {type ===
          NotificationGameForOwnerEnum.NT_GAME_FOR_OWNER_PLAYER_REJECTED && (
          <span>
            Player {data.playerName} reject the game{' '}
            <Link
              className='text-violet-700'
              to={PATHS.createGamePath(String(data.gameId))}
            >
              {data.gameName}
            </Link>{' '}
          </span>
        )}

        {type ===
          NotificationGameForOwnerEnum.NT_GAME_FOR_OWNER_PLAYER_ACCEPTED && (
          <span>
            Player {data.playerName} accept the game{' '}
            <Link
              className='text-violet-700'
              to={PATHS.createGamePath(String(data.gameId))}
            >
              {data.gameName}
            </Link>{' '}
          </span>
        )}

        {type ===
          NotificationGameForOwnerEnum.NT_GAME_FOR_OWNER_PLAYER_LEFT && (
          <span>
            Player {data.playerName} left the game{' '}
            <Link
              className='text-violet-700'
              to={PATHS.createGamePath(String(data.gameId))}
            >
              {data.gameName}
            </Link>{' '}
          </span>
        )}

        {!read && (
          <span className='block w-2 h-2 rounded-full bg-blue-600 ml-1 shrink-0' />
        )}
      </div>
      <div className='text-sm text-gray-500'>
        {new Date(createdAt).toLocaleString()}
      </div>
    </div>
  </div>
)
