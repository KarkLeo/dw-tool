import React, { useState, FC } from 'react'
import { useSelector } from 'react-redux'
import { notificationsDataSelector } from '../../store/notification/selectors'
import {
  NotificationGameForOwnerEnum,
  NotificationGameForPlayerEnum,
  NotificationGameTypes,
} from '../../services/notificationSocket/types/notificationData.types'
import { GameNotificationPlayer } from './GameNotificationPlayer'
import { GameNotificationOwner } from './GameNotificationOwner'
import { GameNotificationOwnerCharacter } from './GameNotificationOwnerCharacter'

const NotificationItemReducer: FC<{ notification: NotificationGameTypes }> = ({
  notification,
}) => {
  if (
    notification.type ===
      NotificationGameForPlayerEnum.NT_GAME_FOR_PLAYER_INVITE ||
    notification.type ===
      NotificationGameForPlayerEnum.NT_GAME_FOR_PLAYER_GAME_READY ||
    notification.type ===
      NotificationGameForPlayerEnum.NT_GAME_FOR_PLAYER_GAME_IN_PROGRESS ||
    notification.type ===
      NotificationGameForPlayerEnum.NT_GAME_FOR_PLAYER_GAME_PAUSED ||
    notification.type ===
      NotificationGameForPlayerEnum.NT_GAME_FOR_PLAYER_GAME_FINISHED ||
    notification.type ===
      NotificationGameForPlayerEnum.NT_GAME_FOR_PLAYER_KICKED
  )
    return <GameNotificationPlayer {...notification} />

  if (
    notification.type ===
      NotificationGameForOwnerEnum.NT_GAME_FOR_OWNER_PLAYER_REJECTED ||
    notification.type ===
      NotificationGameForOwnerEnum.NT_GAME_FOR_OWNER_PLAYER_ACCEPTED ||
    notification.type ===
      NotificationGameForOwnerEnum.NT_GAME_FOR_OWNER_PLAYER_LEFT
  )
    return <GameNotificationOwner {...notification} />

  if (
    notification.type ===
    NotificationGameForOwnerEnum.NT_GAME_FOR_OWNER_PLAYER_SELECTED_CHARACTER
  )
    return <GameNotificationOwnerCharacter {...notification} />

  return null
}

const Notifications: FC = () => {
  const [isOpen, setIsOpen] = useState(true)

  const notifications = useSelector(notificationsDataSelector)

  return (
    <div className='relative font-sans'>
      <button onClick={() => setIsOpen(!isOpen)} className='p-2'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          className='h-6 w-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a4.978 4.978 0 00-1.528-3.5M10 3.528A4.978 4.978 0 018.528 7 4.978 4.978 0 007 11v3.158a2.032 2.032 0 01-.595 1.437L5 17h5m0 0a2 2 0 104 0m-4 0h4'
          />
        </svg>
      </button>
      {isOpen && (
        <div className='absolute text-gray-800 right-0 z-[99999] w-64 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
          {notifications.map((notification) => (
            <NotificationItemReducer
              key={notification.id}
              notification={notification}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Notifications
