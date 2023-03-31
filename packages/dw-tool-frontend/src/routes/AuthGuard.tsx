import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { userDataSelector } from 'src/store/user/selectors'

export const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const user = useSelector(userDataSelector)
  const location = useLocation()

  if (!user) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }

  return children
}
