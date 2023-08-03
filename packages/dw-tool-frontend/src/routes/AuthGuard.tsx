import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import {
  isLoadedUserSelector,
  isLoadingUserSelector,
  userDataSelector,
} from 'src/store/user/selectors'
import { Loader } from '../common/Loader/Loader'
import { useEffect } from 'react'
import { meThunk } from '../store/user/actions/me'
import { useAppDispatch } from '../store/root'

export const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const dispatch = useAppDispatch()

  const user = useSelector(userDataSelector)
  const isLoading = useSelector(isLoadingUserSelector)
  const isLoaded = useSelector(isLoadedUserSelector)
  const location = useLocation()

  useEffect(() => {
    dispatch(meThunk())
  }, [dispatch])

  if (isLoading) {
    return <Loader />
  }

  if (isLoaded && !user) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }

  if (isLoaded && user) {
    return children
  }

  return <div>Ooopps!</div>
}
