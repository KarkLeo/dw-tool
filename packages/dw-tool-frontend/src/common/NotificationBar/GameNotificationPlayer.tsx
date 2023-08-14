import React from 'react'
import {
  GameNotificationPlayerTypes,
  NotificationGameForPlayerEnum,
} from '../../services/notificationSocket/types/notificationData.types'
import { Link } from 'react-router-dom'
import { PATHS } from '../../routes/config'

export const GameNotificationPlayer: React.FC<GameNotificationPlayerTypes> = ({
  type,
  read,
  data,
  createdAt,
  from,
}) => (
  <div
    className={`flex justify-between items-center p-2 ${
      !read ? 'bg-gray-100' : 'bg-white'
    }`}
  >
    <div>
      <div className='font-bold flex items-center'>
        {type === NotificationGameForPlayerEnum.NT_GAME_FOR_PLAYER_INVITE && (
          <span>
            You invited {from.name} to play{' '}
            <Link
              className='text-violet-700'
              to={PATHS.createGamePath(String(data.gameId))}
            >
              {data.gameName}
            </Link>{' '}
          </span>
        )}

        {type ===
          NotificationGameForPlayerEnum.NT_GAME_FOR_PLAYER_GAME_READY && (
          <span>
            Game
            <Link
              className='text-violet-700'
              to={PATHS.createGamePath(String(data.gameId))}
            >
              {data.gameName}
            </Link>
            is ready to play{' '}
          </span>
        )}

        {type ===
          NotificationGameForPlayerEnum.NT_GAME_FOR_PLAYER_GAME_IN_PROGRESS && (
          <span>
            Game
            <Link
              className='text-violet-700'
              to={PATHS.createGamePath(String(data.gameId))}
            >
              {data.gameName}
            </Link>
            is in progress{' '}
          </span>
        )}

        {type ===
          NotificationGameForPlayerEnum.NT_GAME_FOR_PLAYER_GAME_PAUSED && (
          <span>
            Game
            <Link
              className='text-violet-700'
              to={PATHS.createGamePath(String(data.gameId))}
            >
              {data.gameName}
            </Link>
            is paused{' '}
          </span>
        )}

        {type ===
          NotificationGameForPlayerEnum.NT_GAME_FOR_PLAYER_GAME_FINISHED && (
          <span>
            Game
            <Link
              className='text-violet-700'
              to={PATHS.createGamePath(String(data.gameId))}
            >
              {data.gameName}
            </Link>
            is finished{' '}
          </span>
        )}

        {type === NotificationGameForPlayerEnum.NT_GAME_FOR_PLAYER_KICKED && (
          <span>
            You was kicked from game{' '}
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
