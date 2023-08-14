import React from 'react'
import { GameNotificationOwnerCharacterTypes } from '../../services/notificationSocket/types/notificationData.types'
import { Link } from 'react-router-dom'
import { PATHS } from '../../routes/config'

export const GameNotificationOwnerCharacter: React.FC<
  GameNotificationOwnerCharacterTypes
> = ({ read, data, createdAt, from }) => (
  <div
    className={`flex justify-between items-center p-2 ${
      !read ? 'bg-gray-100' : 'bg-white'
    }`}
  >
    <div>
      <div className='font-bold flex items-center'>
        <span>
          {' '}
          Player {data.playerName} select character
          <Link
            className='text-violet-700'
            to={PATHS.createCharacterPath(String(data.characterId))}
          >
            {data.characterName}
          </Link>{' '}
          in the game{' '}
          <Link
            className='text-violet-700'
            to={PATHS.createGamePath(String(data.gameId))}
          >
            {data.gameName}
          </Link>{' '}
        </span>
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
