import { useParams } from 'react-router-dom'
import { Menu } from '../common/Menu/Menu'
import { useEffect, useMemo, useRef, useState } from 'react'
import { gamesServices } from '../services/games'
import { useSelector } from 'react-redux'
import { userDataSelector } from '../store/user/selectors'
import { characterServices } from '../services/character'
import { ICharacterListData } from 'dw-tool-meta'

interface IGameResponse {
  id: number
  name: string
  description: string
  status: string
  players: {
    id: number
    isOwner: boolean
    status: string
    user: {
      id: number
      email: string
      name: string
    }
    character?:
      | {
          id: number
          name: string
          class: string
          race: string
        }
      | ICharacterListData
  }[]
}

export const DetailGamePage = () => {
  const { gameId } = useParams()
  const user = useSelector(userDataSelector)
  const [game, setGame] = useState<IGameResponse | null>(null)
  const [selectedCharacter, setSelectedCharacter] =
    useState<null | ICharacterListData>(null)
  useEffect(() => {
    const fetchGames = async () => {
      if (gameId) {
        const res = await gamesServices.findOne(gameId)
        setGame(res.data as IGameResponse)
      }
    }

    fetchGames()
  }, [setGame, gameId])

  const myPlayer = useMemo(() => {
    const player = game?.players.find((player) => player.user.id === user?.id)
    if (player && selectedCharacter) player.character = selectedCharacter

    return player
  }, [game, user, selectedCharacter])

  // ===== Dropdown =====

  const [isOpen, setIsOpen] = useState(false)
  const container = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (container.current && !container.current.contains(target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [handleClickOutside])

  // ===== Character list =====

  const [characters, setCharacters] = useState<ICharacterListData[]>([])

  useEffect(() => {
    const fetchCharacters = async () => {
      const res = await characterServices.getList()
      setCharacters(res.data)
    }

    fetchCharacters()
  }, [setCharacters])

  //todo create for different status

  return (
    <div className='font-sans'>
      <Menu />
      <div className='mt-4'>
        <h1 className='text-4xl font-bold text-center text-blue-700 my-4'>
          Detail Games page
        </h1>
      </div>
      {game && (
        <div className='bg-white shadow rounded p-4 w-96 mx-auto text-gray-950'>
          <h2 className='text-xl font-bold mb-2'>{game.name}</h2>
          <p className='text-gray-700 mb-2'>{game.description}</p>
          <p className='text-green-500 mb-4'>{game.status}</p>
          <h3 className='text-lg font-bold mb-2'>Players:</h3>
          <hr />
          {myPlayer && (
            <div className='mb-2'>
              <h4 className='font-bold'>
                {myPlayer.user.name} {myPlayer.isOwner ? '(Owner)' : ''}
              </h4>
              <p>{myPlayer.user.email}</p>
              <p>Status: {myPlayer.status}</p>
              {!myPlayer.isOwner && (
                <p>
                  Character:
                  <div
                    className='relative inline-block text-left'
                    ref={container}
                  >
                    <div>
                      <button
                        type='button'
                        onClick={() => setIsOpen(!isOpen)}
                        className='inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500'
                      >
                        {myPlayer.character
                          ? `${myPlayer.character.name} (${myPlayer.character.class} - ${myPlayer.character.race})`
                          : 'Select Character'}
                      </button>
                    </div>

                    {isOpen && (
                      <div className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
                        <div
                          className='py-1'
                          role='menu'
                          aria-orientation='vertical'
                          aria-labelledby='options-menu'
                        >
                          {characters.map((character) => (
                            <button
                              key={character.id}
                              onClick={() => {
                                setSelectedCharacter(character)
                                setIsOpen(false)
                              }}
                              disabled={
                                myPlayer?.character?.id === character.id
                              }
                              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed'
                            >
                              {character.name} ({character.class} -{' '}
                              {character.race})
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </p>
              )}
            </div>
          )}
          <hr />
          <ul>
            {game.players.map(
              (player) =>
                player.user.id !== user?.id && (
                  <li key={player.id} className='mb-2'>
                    <h4 className='font-bold'>
                      {player.user.name} {player.isOwner ? '(Owner)' : ''}
                    </h4>
                    <p>{player.user.email}</p>
                    <p>Status: {player.status}</p>
                    {player.character && (
                      <p>
                        Character: {player.character.name} (
                        {player.character.class}, {player.character.race})
                      </p>
                    )}
                    {myPlayer?.isOwner && (
                      <button
                        className='text-blue-500 hover:text-blue-700 focus:outline-none focus:underline'
                        disabled
                      >
                        Remove
                      </button>
                    )}
                  </li>
                )
            )}
          </ul>
          {myPlayer?.isOwner && (
            <button
              className='text-blue-500 hover:text-blue-700 focus:outline-none focus:underline'
              disabled
            >
              Add player
            </button>
          )}
        </div>
      )}
    </div>
  )
}
