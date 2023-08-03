import { AppPage } from 'src/pages/AppPage'
import { AuthPage } from 'src/pages/AuthPage'
import { CreateCharacterPage } from 'src/pages/CreateCharacterPage'
import { CharacterPage } from '../pages/CharacterPage'

export const ROUTES = [
  {
    path: '/login',
    component: AuthPage,
    auth: false,
  },
  {
    path: '/',
    component: AppPage,
    auth: true,
  },
  {
    path: '/character/create',
    component: CreateCharacterPage,
    auth: true,
  },
  {
    path: '/character/:characterId',
    component: CharacterPage,
    auth: true,
  },
]
