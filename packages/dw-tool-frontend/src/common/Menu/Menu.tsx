import { Link } from 'react-router-dom'
import { PATHS } from '../../routes/config'
import Notifications from '../NotificationBar'

const tStyles = {
  container: 'flex space-x-4 bg-blue-500 text-white p-4',
  link: 'hover:bg-blue-700 px-2 py-1 rounded',
}

export const Menu = () => {
  return (
    <nav className={tStyles.container}>
      <li>
        <Link to={PATHS.APP} className={tStyles.link}>
          Home
        </Link>
      </li>
      <li>
        <Link to={PATHS.GAMES} className={tStyles.link}>
          Games
        </Link>
      </li>
      <li>
        <Link to={PATHS.GAMES_CREATE} className={tStyles.link}>
          Create game
        </Link>
      </li>
      <Notifications />
    </nav>
  )
}
