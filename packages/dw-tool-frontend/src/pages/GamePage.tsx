import { Link } from 'react-router-dom'
import { Menu } from '../common/Menu/Menu'
import { useEffect, useState } from 'react'
import { gamesServices } from '../services/games'

interface IGameResponse {
  id: number
  name: string
  description: string
  status: string
}

export const GamePage = () => {
  const [games, setGames] = useState<IGameResponse[]>([])

  useEffect(() => {
    console.log('GamePage')
    const fetchGames = async () => {
      const res = await gamesServices.findAll()
      setGames(res.data as IGameResponse[])
    }

    fetchGames()
  }, [setGames])

  return (
    <div className='font-sans'>
      <Menu />
      <div className='mt-4'>
        <h1 className='text-4xl font-bold text-center text-blue-700 my-4'>
          Games page
        </h1>
        <div className='w-96 mx-auto'>
          <Link
            to='/games/create'
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'
          >
            Create game
          </Link>
        </div>
        <div className='flex flex-col space-y-4 mt-5 w-96 mx-auto'>
          {games.map((game) => (
            <Link
              to={`/games/${game.id}`}
              key={game.id}
              className='flex  bg-blue-100 rounded p-4 justify-between'
            >
              <div className='flex flex-col space-y-1'>
                <span className='font-bold text-blue-700'>{game.name}</span>
                <span className='text-blue-500'>{game.description}</span>
              </div>
              <span className='text-green-500'>{game.status}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
