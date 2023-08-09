import { AppPage } from 'src/pages/AppPage'
import { AuthPage } from 'src/pages/AuthPage'
import { CreateCharacterPage } from 'src/pages/CreateCharacterPage'
import { CharacterPage } from '../pages/CharacterPage'
import { GamePage } from '../pages/GamePage'
import { CreateGamePage } from '../pages/CreateGamePage'
import { DetailGamePage } from '../pages/DetailGamePage'

export const PATHS = {
  LOGIN: '/login',
  APP: '/',
  CHARACTER_CREATE: '/character/create',
  CHARACTER_DETAIL: '/character/:characterId',
  createCharacterPath: (characterId: string) => `/character/${characterId}`,
  GAMES: '/games/',
  GAMES_CREATE: '/games/create',
  GAMES_DETAIL: '/games/:gameId',
  createGamePath: (gameId: string) => `/games/${gameId}`,
}

export const ROUTES = [
  {
    path: PATHS.LOGIN,
    component: AuthPage,
    auth: false,
  },
  {
    path: PATHS.APP,
    component: AppPage,
    auth: true,
  },
  {
    path: PATHS.CHARACTER_CREATE,
    component: CreateCharacterPage,
    auth: true,
  },
  {
    path: PATHS.CHARACTER_DETAIL,
    component: CharacterPage,
    auth: true,
  },
  {
    path: PATHS.GAMES,
    component: GamePage,
    auth: true,
  },
  {
    path: PATHS.GAMES_CREATE,
    component: CreateGamePage,
    auth: true,
  },
  {
    path: PATHS.GAMES_DETAIL,
    component: DetailGamePage,
    auth: true,
  },
]
