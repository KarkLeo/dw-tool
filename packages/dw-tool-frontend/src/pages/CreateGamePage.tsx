import { Menu } from '../common/Menu/Menu'
import { CreateGameForm } from '../modules/Game/components/CreateGameForm/CreateGameForm'

export const CreateGamePage = () => {
  return (
    <div className='font-sans'>
      <Menu />
      <div className='mt-4'>
        <h1 className='text-4xl font-bold text-center text-blue-700 my-4'>
          Create a New Game
        </h1>
        <CreateGameForm />
      </div>
    </div>
  )
}
