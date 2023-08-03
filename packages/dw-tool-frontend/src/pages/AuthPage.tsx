import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { Auth } from 'src/modules/Auth'
import { userDataSelector } from 'src/store/user/selectors'
import { useAppDispatch } from '../store/root'
import { meThunk } from '../store/user/actions/me'

export const AuthPage = () => {
  const dispatch = useAppDispatch()

  const user = useSelector(userDataSelector)

  useEffect(() => {
    dispatch(meThunk())
  }, [dispatch])

  return !user ? <Auth /> : <Navigate to='/' replace />
}
