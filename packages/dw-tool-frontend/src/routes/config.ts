import { AppPage } from 'src/pages/AppPage'
import { AuthPage } from 'src/pages/AuthPage'

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
]
